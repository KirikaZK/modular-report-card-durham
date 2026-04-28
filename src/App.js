import React, { useState, useEffect } from 'react';
import { Award, BookOpen, Download, FileText, Printer, User } from 'lucide-react';

// Helper for rendering standard inputs (Moved outside App to prevent focus loss on re-render)
const FormInput = ({ label, type = "text", placeholder, value, onChange, readOnly }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-transparent print:resize-none font-medium text-slate-800 ${readOnly ? 'bg-slate-50 text-slate-500 print:text-slate-800 print:bg-white' : ''}`}
    />
  </div>
);

// Helper to safely format CSV strings
const safeCSV = (str) => {
  if (!str) return "";
  return `"${String(str).replace(/"/g, '""').replace(/\n/g, ' ')}"`;
};

export default function App() {
  const [keyStage, setKeyStage] = useState('early_years');
  
  // State for Student Details
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [admissionNum, setAdmissionNum] = useState('');
  const [assessmentPeriod, setAssessmentPeriod] = useState('');

  // State for Attendance
  const [totalDays, setTotalDays] = useState('');
  const [daysAttended, setDaysAttended] = useState('');

  // State for Early Years Grades (Section 2)
  const [earlyYearsData, setEarlyYearsData] = useState([
    { category: 'Communications', milestone: '', grade: '3', notes: '' },
    { category: 'Numerics & Color/Shapes', milestone: '', grade: '3', notes: '' },
    { category: 'Motor Skills', milestone: '', grade: '3', notes: '' },
    { category: 'Reading/Writing', milestone: '', grade: '3', notes: '' }
  ]);

  const handleEarlyYearsChange = (index, field, value) => {
    const newData = [...earlyYearsData];
    newData[index][field] = value;
    setEarlyYearsData(newData);
  };

  // State for Junior School Grades (Section 2)
  const [juniorGrades, setJuniorGrades] = useState([
    { subject: 'English', mte: '', ete: '', grade: '' },
    { subject: 'Mathematics', mte: '', ete: '', grade: '' },
    { subject: 'Science', mte: '', ete: '', grade: '' },
    { subject: 'Computing', mte: '', ete: '', grade: '' },
    { subject: 'Art & Design', mte: '', ete: '', grade: '' },
    { subject: 'French', mte: '', ete: '', grade: '' },
    { subject: 'Geography', mte: '', ete: '', grade: '' },
    { subject: 'History', mte: '', ete: '', grade: '' },
    { subject: 'Music', mte: '', ete: '', grade: '' }
  ]);

  const handleJuniorGradeChange = (index, field, value) => {
    const updatedGrades = [...juniorGrades];
    updatedGrades[index][field] = value;
    setJuniorGrades(updatedGrades);
  };

  // State for Senior School Grades (Section 2)
  const [examBoard, setExamBoard] = useState('');
  const [seniorGrades, setSeniorGrades] = useState(
    Array.from({ length: 8 }, () => ({ code: '', title: '', result: '', mark: '' }))
  );

  const handleSeniorGradeChange = (index, field, value) => {
    const newGrades = [...seniorGrades];
    newGrades[index][field] = value;
    setSeniorGrades(newGrades);
  };

  // State for Section 3 (Attitude & Social)
  const [eySocial1, setEySocial1] = useState('');
  const [eySocial2, setEySocial2] = useState('');
  const [attitudeScores, setAttitudeScores] = useState(Array(6).fill(''));
  const [behavioralScores, setBehavioralScores] = useState(Array(4).fill('Excellent'));

  const handleAttitudeChange = (index, value) => {
    const newScores = [...attitudeScores];
    newScores[index] = value;
    setAttitudeScores(newScores);
  };

  const handleBehaviorChange = (index, value) => {
    const newScores = [...behavioralScores];
    newScores[index] = value;
    setBehavioralScores(newScores);
  };

  // State for Section 4 (Educator Remarks)
  const [classTeacherComment, setClassTeacherComment] = useState('');
  const [formTutorComment, setFormTutorComment] = useState('');
  const [educatorName, setEducatorName] = useState('');
  const [signDate, setSignDate] = useState('');

  // Function to safely calculate the percentage
  const calculateAttendance = () => {
    const total = parseFloat(totalDays);
    const attended = parseFloat(daysAttended);
    
    if (!isNaN(total) && !isNaN(attended) && total > 0) {
      return ((attended * 100) / total).toFixed(1) + '%';
    }
    return '';
  };

  // Inject Tailwind via CDN on mount to ensure styles load
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Excel/CSV Export Function
  const exportToExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // --- Header ---
    csvContent += "Durham International School - ACADEMIC & PERFORMANCE CARD\n";
    csvContent += "P.O. Box 43045-00100 Nairobi, Kenya | Tel: +254 700 387426\n\n";
    
    // --- SECTION 1 ---
    csvContent += "SECTION 1: STUDENT DETAILS\n";
    csvContent += "Student Name,Age,Class,Admission Number,Assessment Period,Total Days,Days Attended,% Attendance\n";
    csvContent += `${safeCSV(studentName)},${safeCSV(studentAge)},${safeCSV(studentClass)},${safeCSV(admissionNum)},${safeCSV(assessmentPeriod)},${safeCSV(totalDays)},${safeCSV(daysAttended)},${safeCSV(calculateAttendance())}\n\n`; 
    
    // --- SECTION 2 ---
    if (keyStage === 'early_years') {
      csvContent += "SECTION 2: ACADEMIC PROGRESS - EARLY YEARS\n";
      csvContent += "Category,Milestone,Grading (1-3),Notes\n";
      earlyYearsData.forEach(row => {
        csvContent += `${safeCSV(row.category)},${safeCSV(row.milestone)},${safeCSV(row.grade)},${safeCSV(row.notes)}\n`;
      });
    } else if (keyStage === 'junior') {
      csvContent += "SECTION 2: ACADEMIC PROGRESS - JUNIOR SCHOOL\n";
      csvContent += "Subject,MTE,ETE,TA %,Grade\n";
      juniorGrades.forEach(row => {
        let ta = '';
        let autoGrade = '';
        const mteNum = parseFloat(row.mte);
        const eteNum = parseFloat(row.ete);
        
        if (!isNaN(mteNum) && !isNaN(eteNum)) {
          const taNum = (mteNum + eteNum) / 2;
          ta = taNum.toFixed(1);
          if (taNum >= 90) autoGrade = 'A1';
          else if (taNum >= 80) autoGrade = 'A2';
          else if (taNum >= 70) autoGrade = 'B1';
          else if (taNum >= 60) autoGrade = 'B2';
          else if (taNum >= 50) autoGrade = 'C1';
          else if (taNum >= 40) autoGrade = 'C2';
          else if (taNum >= 30) autoGrade = 'D1';
          else if (taNum >= 20) autoGrade = 'D2';
          else autoGrade = 'E';
        }
        csvContent += `${safeCSV(row.subject)},${safeCSV(row.mte)},${safeCSV(row.ete)},${safeCSV(ta)},${safeCSV(autoGrade)}\n`;
      });
    } else if (keyStage === 'senior') {
      csvContent += "SECTION 2: ACADEMIC PROGRESS - SENIOR SCHOOL\n";
      csvContent += `Examination Board & Level: ${safeCSV(examBoard)}\n`;
      csvContent += "Syllabus Code,Syllabus Title,Result %,Uniform Mark\n";
      seniorGrades.forEach(row => {
        if (row.code || row.title || row.result || row.mark) {
          csvContent += `${safeCSV(row.code)},${safeCSV(row.title)},${safeCSV(row.result)},${safeCSV(row.mark)}\n`;
        }
      });
    }

    // --- SECTION 3 ---
    csvContent += "\nSECTION 3: ATTITUDE & SOCIAL COMPETENCIES\n";
    if (keyStage === 'early_years') {
      csvContent += "Metric,Notes\n";
      csvContent += `Can work with others,${safeCSV(eySocial1)}\n`;
      csvContent += `Can express issues and concerns calmly,${safeCSV(eySocial2)}\n`;
    } else {
      csvContent += "Attitude to Learning Scale,Score\n";
      const attitudeTitles = [
        "Curiosity & Focus", "Participation", "Help-Seeking & Independence",
        "Response to Feedback", "Organization", "Behavior & Environment"
      ];
      attitudeTitles.forEach((title, idx) => {
        csvContent += `${safeCSV(title)},${safeCSV(attitudeScores[idx])}\n`;
      });
      
      csvContent += "\nForm Tutor Behavioral Summary,Rating\n";
      const behaviorTitles = [
        'Cooperate with Peers', 'Cooperate with Teachers', 'Discipline / Behaviour', 'Grooming & Appearance'
      ];
      behaviorTitles.forEach((title, idx) => {
        csvContent += `${safeCSV(title)},${safeCSV(behavioralScores[idx])}\n`;
      });
    }

    // --- SECTION 4 ---
    csvContent += "\nSECTION 4: FINAL EDUCATOR REMARKS\n";
    csvContent += `Class Teacher's Comment,${safeCSV(classTeacherComment)}\n`;
    csvContent += `Form Tutor / Head of School Comment,${safeCSV(formTutorComment)}\n`;
    csvContent += `Educator Name,${safeCSV(educatorName)}\n`;
    csvContent += `Date,${safeCSV(signDate)}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Report_Card_${studentName ? studentName.replace(/\s+/g, '_') : 'Student'}_${keyStage}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans print:bg-white print:p-0">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden print:shadow-none">
        
        {/* SCREEN HEADER (Hidden on Print) */}
        <div className="bg-[#0e1a98] text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:hidden">
          
          {/* Main Title & Logo Wrapper */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shrink-0">
              <img 
                src="/durham_logo.png" 
                alt="Durham International School Logo" 
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/100x100/eeeeee/333333?text=Durham";
                }}
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold font-serif tracking-normal whitespace-nowrap">ACADEMIC & PERFORMANCE CARD</h1>
              <p className="text-slate-300 mt-1 text-sm">Durham International School Report</p>
            </div>
          </div>
          
          <div className="flex items-end gap-3">
            <div className="flex flex-col items-end mr-2">
              <label className="text-sm font-semibold text-slate-300 mb-1">Select Key Stage:</label>
              <select 
                className="bg-white text-slate-800 px-3 py-2 rounded-md font-semibold focus:outline-none cursor-pointer shadow-sm"
                value={keyStage}
                onChange={(e) => setKeyStage(e.target.value)}
              >
                <option value="early_years">Early Years (Ages 3-6)</option>
                <option value="junior">Junior & Middle (Ages 7-13)</option>
                <option value="senior">Senior School (Ages 14-18)</option>
              </select>
            </div>
            
            <button 
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 h-[40px] rounded-md font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
              title="Download as Excel (CSV)"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Excel</span>
            </button>

            <button 
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 h-[40px] rounded-md font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
              title="Save as PDF or Print"
            >
              <Printer size={18} />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* PRINT HEADER (Hidden on Screen, Visible only on PDF) */}
        <div className="hidden print:flex flex-row justify-between items-end border-b-4 border-[#0e1a98] pb-6 mb-6 pt-4">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 flex items-center justify-center shrink-0">
              <img 
                src="/durham_logo.png" 
                alt="Durham International School Logo" 
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/100x100/eeeeee/333333?text=Durham";
                }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif tracking-wide text-black uppercase">
                Durham International School
              </h1>
              <p className="text-slate-700 mt-1 text-base font-medium">
                P.O. Box 43045-00100 Nairobi, Kenya | Tel: +254 700 387426
              </p>
              <div className="mt-3 border-t border-slate-300 pt-2 inline-block">
                <h2 className="text-xl font-bold text-slate-800 uppercase tracking-widest">
                  Academic & Performance Card
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 print:p-0 print:pt-2 space-y-8 print:space-y-6">
          
          {/* SECTION 1: Universal Student Details */}
          <section className="bg-slate-50 print:bg-white p-6 print:p-0 rounded-lg border border-slate-200 print:border-none">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <User size={20} className="text-blue-600 print:text-slate-800"/>
              <h2 className="text-lg font-bold uppercase tracking-wider">Section 1: Student Details & Attendance</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <FormInput label="Student Name" placeholder="e.g. Jackson Connor" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
              <FormInput label="Age" type="number" placeholder="e.g. 4" value={studentAge} onChange={(e) => setStudentAge(e.target.value)} />
              <FormInput label="Class" placeholder="e.g. Pre-K" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} />
              <FormInput label="Admission Number" placeholder="e.g. ADM-2026" value={admissionNum} onChange={(e) => setAdmissionNum(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
              <FormInput label="Assessment Period" placeholder="e.g. End of Term II 2026" value={assessmentPeriod} onChange={(e) => setAssessmentPeriod(e.target.value)} />
              <FormInput 
                label="Total Days" 
                type="number" 
                placeholder="e.g. 90" 
                value={totalDays}
                onChange={(e) => setTotalDays(e.target.value)}
              />
              <FormInput 
                label="Days Attended" 
                type="number" 
                placeholder="e.g. 85" 
                value={daysAttended}
                onChange={(e) => setDaysAttended(e.target.value)}
              />
              <FormInput 
                label="% Attendance" 
                placeholder="Auto-calculated" 
                value={calculateAttendance()}
                readOnly={true}
              />
            </div>
          </section>

          {/* SECTION 2: Academic & Developmental Progress */}
          <section className="bg-white">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <BookOpen size={20} className="text-blue-600 print:text-slate-800"/>
              <h2 className="text-lg font-bold uppercase tracking-wider">Section 2: Academic Progress</h2>
            </div>

            {/* MODULE A: EARLY YEARS */}
            {keyStage === 'early_years' && (
              <div className="space-y-6">
                <p className="text-sm text-gray-500 italic mb-2 print:hidden">Focuses on granular developmental milestones with a 1-3 star visual grading system.</p>
                
                {earlyYearsData.map((row, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-md overflow-hidden">
                    <div className="bg-blue-50 print:bg-slate-100 px-4 py-2 font-bold text-blue-800 print:text-slate-800 border-b border-gray-200 print:border-slate-300">{row.category}</div>
                    <div className="grid grid-cols-12 gap-0 bg-gray-50 print:bg-white text-xs font-semibold text-gray-600 print:text-slate-700 border-b border-gray-200 print:border-slate-300">
                      <div className="col-span-4 p-2">Milestone</div>
                      <div className="col-span-3 p-2 border-l border-gray-200 print:border-slate-300">Grading (1-3)</div>
                      <div className="col-span-5 p-2 border-l border-gray-200 print:border-slate-300">Educator Notes</div>
                    </div>
                    <div className="grid grid-cols-12 gap-0 border-b border-gray-100 print:border-slate-200 last:border-0">
                      <div className="col-span-4 p-2">
                        <input 
                          className="w-full text-sm outline-none bg-transparent" 
                          placeholder={`Enter ${row.category} milestone...`} 
                          value={row.milestone}
                          onChange={(e) => handleEarlyYearsChange(idx, 'milestone', e.target.value)}
                        />
                      </div>
                      <div className="col-span-3 p-2 border-l border-gray-100 print:border-slate-200 flex items-center gap-2">
                        <select 
                          className="text-sm bg-transparent outline-none w-full text-yellow-500 print:text-slate-800 font-bold print:appearance-none cursor-pointer"
                          value={row.grade}
                          onChange={(e) => handleEarlyYearsChange(idx, 'grade', e.target.value)}
                        >
                          <option value="3">★★★ (Acing it)</option>
                          <option value="2">★★☆ (Steady)</option>
                          <option value="1">★☆☆ (Needs Support)</option>
                        </select>
                      </div>
                      <div className="col-span-5 p-2 border-l border-gray-100 print:border-slate-200">
                        <input 
                          className="w-full text-sm outline-none bg-transparent" 
                          placeholder="Observation notes..." 
                          value={row.notes}
                          onChange={(e) => handleEarlyYearsChange(idx, 'notes', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MODULE B: JUNIOR */}
            {keyStage === 'junior' && (
              <div>
                <p className="text-sm text-gray-500 italic mb-2 print:hidden">Transitions into formal subjects tracking MTE, ETE, TA%, and final grades.</p>
                <div className="border border-gray-200 rounded-md overflow-hidden overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 print:bg-slate-200 text-slate-700 text-sm">
                        <th className="p-3 border-b border-r border-gray-200 print:border-slate-300">Core Subjects</th>
                        <th className="p-3 border-b border-r border-gray-200 print:border-slate-300 w-24 text-center">MTE</th>
                        <th className="p-3 border-b border-r border-gray-200 print:border-slate-300 w-24 text-center">ETE</th>
                        <th className="p-3 border-b border-r border-gray-200 print:border-slate-300 w-24 text-center">TA %</th>
                        <th className="p-3 border-b border-gray-200 print:border-slate-300 w-24 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {juniorGrades.map((row, idx) => {
                        let ta = '';
                        let autoGrade = '';
                        const mteNum = parseFloat(row.mte);
                        const eteNum = parseFloat(row.ete);
                        
                        if (!isNaN(mteNum) && !isNaN(eteNum)) {
                          const taNum = (mteNum + eteNum) / 2;
                          ta = taNum.toFixed(1);

                          if (taNum >= 90) autoGrade = 'A1';
                          else if (taNum >= 80) autoGrade = 'A2';
                          else if (taNum >= 70) autoGrade = 'B1';
                          else if (taNum >= 60) autoGrade = 'B2';
                          else if (taNum >= 50) autoGrade = 'C1';
                          else if (taNum >= 40) autoGrade = 'C2';
                          else if (taNum >= 30) autoGrade = 'D1';
                          else if (taNum >= 20) autoGrade = 'D2';
                          else autoGrade = 'E';
                        }

                        return (
                          <tr key={idx} className="border-b border-gray-100 print:border-slate-200 last:border-0 hover:bg-slate-50">
                            <td className="p-3 border-r border-gray-100 print:border-slate-200 font-medium text-slate-800">{row.subject}</td>
                            <td className="p-2 border-r border-gray-100 print:border-slate-200">
                              <input 
                                type="number"
                                className="w-full text-center outline-none bg-transparent" 
                                placeholder="-" 
                                value={row.mte}
                                onChange={(e) => handleJuniorGradeChange(idx, 'mte', e.target.value)}
                              />
                            </td>
                            <td className="p-2 border-r border-gray-100 print:border-slate-200">
                              <input 
                                type="number"
                                className="w-full text-center outline-none bg-transparent" 
                                placeholder="-" 
                                value={row.ete}
                                onChange={(e) => handleJuniorGradeChange(idx, 'ete', e.target.value)}
                              />
                            </td>
                            <td className="p-2 border-r border-gray-100 print:border-slate-200 bg-slate-50 print:bg-white">
                              <input 
                                className="w-full text-center outline-none bg-transparent text-slate-500 print:text-slate-800 font-medium cursor-not-allowed" 
                                placeholder="-" 
                                value={ta}
                                readOnly
                              />
                            </td>
                            <td className="p-2 bg-slate-50 print:bg-white">
                              <input 
                                className="w-full text-center font-bold text-slate-700 outline-none bg-transparent cursor-not-allowed" 
                                placeholder="-" 
                                value={autoGrade}
                                readOnly
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-xs text-slate-500 print:text-slate-800 bg-slate-50 print:bg-white p-2 rounded print:border print:border-slate-200">
                  <strong>Grading Key:</strong> 90-100: A1 | 80-89: A2 | 70-79: B1 | 60-69: B2 | 50-59: C1 | 40-49: C2 | 30-39: D1 | 20-29: D2 | Below 20: E
                </div>
              </div>
            )}

            {/* MODULE C: SENIOR */}
            {keyStage === 'senior' && (
              <div>
                <p className="text-sm text-gray-500 italic mb-2 print:hidden">Streamlined quantitative view for standardized testing and higher education preparation.</p>
                <div className="mb-4 flex gap-4">
                  <FormInput 
                    label="Examination Board & Level" 
                    placeholder="e.g. Cambridge IGCSE" 
                    value={examBoard}
                    onChange={(e) => setExamBoard(e.target.value)}
                  />
                </div>
                <div className="border border-gray-200 rounded-md overflow-hidden overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 print:bg-slate-200 text-slate-700 text-sm">
                        <th className="p-3 border-b border-r border-gray-200 print:border-slate-300 w-32">Syllabus Code</th>
                        <th className="p-3 border-b border-r border-gray-200 print:border-slate-300">Syllabus Title</th>
                        <th className="p-3 border-b border-r border-gray-200 print:border-slate-300 w-32 text-center">Result %</th>
                        <th className="p-3 border-b border-gray-200 print:border-slate-300 w-32 text-center">Uniform Mark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seniorGrades.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-100 print:border-slate-200 last:border-0 hover:bg-slate-50">
                          <td className="p-2 border-r border-gray-100 print:border-slate-200">
                            <input 
                              className="w-full outline-none bg-transparent" 
                              placeholder="e.g. 0580" 
                              value={row.code}
                              onChange={(e) => handleSeniorGradeChange(idx, 'code', e.target.value)}
                            />
                          </td>
                          <td className="p-2 border-r border-gray-100 print:border-slate-200">
                            <input 
                              className="w-full outline-none bg-transparent" 
                              placeholder="e.g. Mathematics" 
                              value={row.title}
                              onChange={(e) => handleSeniorGradeChange(idx, 'title', e.target.value)}
                            />
                          </td>
                          <td className="p-2 border-r border-gray-100 print:border-slate-200">
                            <input 
                              className="w-full text-center outline-none bg-transparent" 
                              placeholder="-" 
                              value={row.result}
                              onChange={(e) => handleSeniorGradeChange(idx, 'result', e.target.value)}
                            />
                          </td>
                          <td className="p-2">
                            <input 
                              className="w-full text-center outline-none bg-transparent font-bold" 
                              placeholder="-" 
                              value={row.mark}
                              onChange={(e) => handleSeniorGradeChange(idx, 'mark', e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 3: Universal Attitude to Learning */}
          <section className="bg-white pt-4 border-t border-slate-200 print:border-slate-300">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <Award size={20} className="text-blue-600 print:text-slate-800"/>
              <h2 className="text-lg font-bold uppercase tracking-wider">Section 3: Attitude & Social Competencies</h2>
            </div>

            {keyStage === 'early_years' ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-orange-200 print:border-slate-300 rounded-md p-4 bg-orange-50 print:bg-white">
                  <h3 className="font-bold text-orange-800 print:text-slate-800 mb-2 border-b border-orange-200 print:border-slate-300 pb-2">Social / Emotional Metrics</h3>
                  <div className="space-y-3 mt-3">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Can work with others</label>
                      <input 
                        className="w-full mt-1 p-2 border border-orange-200 print:border-slate-300 print:border-none print:px-0 rounded text-sm outline-none bg-transparent" 
                        placeholder="Add observation notes..."
                        value={eySocial1}
                        onChange={(e) => setEySocial1(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Can express issues and concerns calmly</label>
                      <input 
                        className="w-full mt-1 p-2 border border-orange-200 print:border-slate-300 print:border-none print:px-0 rounded text-sm outline-none bg-transparent" 
                        placeholder="Add observation notes..."
                        value={eySocial2}
                        onChange={(e) => setEySocial2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-100 print:bg-slate-200 text-slate-700">
                        <th className="p-3 border-b border-r border-gray-200 print:border-slate-300">Attitude to Learning Scale</th>
                        <th className="p-3 border-b border-gray-200 print:border-slate-300 w-48 text-center">Score (1-5)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { title: "Curiosity & Focus", desc: "1: Does not listen - 5: Highly motivated/intellectual curiosity" },
                        { title: "Participation", desc: "1: Rarely engages - 5: Actively participates in all elements" },
                        { title: "Help-Seeking & Independence", desc: "1: Very reluctant to seek help - 5: Seeks own solutions first" },
                        { title: "Response to Feedback", desc: "1: Responds negatively - 5: Invites and responds positively" },
                        { title: "Organization", desc: "1: Misses deadlines/equipment - 5: Organizes time effectively" },
                        { title: "Behavior & Environment", desc: "1: Disrupts classroom - 5: Exceptional behavior, sets example" },
                      ].map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100 print:border-slate-200 last:border-0 hover:bg-slate-50">
                          <td className="p-3 border-r border-gray-100 print:border-slate-200">
                            <div className="font-semibold text-slate-800">{item.title}</div>
                            <div className="text-xs text-slate-500 mt-1 print:hidden">{item.desc}</div>
                          </td>
                          <td className="p-2 text-center">
                            <select 
                              className="w-full p-2 border border-gray-200 print:border-none rounded bg-white text-center font-bold text-slate-700 focus:outline-none cursor-pointer print:appearance-none"
                              value={attitudeScores[idx]}
                              onChange={(e) => handleAttitudeChange(idx, e.target.value)}
                            >
                              <option value="">-</option>
                              <option value="5">5 - Exceptional</option>
                              <option value="4">4 - Good</option>
                              <option value="3">3 - Satisfactory</option>
                              <option value="2">2 - Reluctant</option>
                              <option value="1">1 - Discouraged</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 print:bg-white border border-slate-200 print:border-slate-300 rounded-md">
                  <div className="col-span-full mb-2 font-bold text-slate-700">Form Tutor Behavioral Summary</div>
                  {['Cooperate with Peers', 'Cooperate with Teachers', 'Discipline / Behaviour', 'Grooming & Appearance'].map((item, idx) => (
                     <div key={item} className="flex flex-col">
                       <label className="text-xs font-semibold text-gray-600 mb-1">{item}</label>
                       <select 
                        className="p-2 border border-gray-200 print:border-none print:px-0 rounded text-sm bg-white outline-none cursor-pointer print:appearance-none font-medium text-slate-800"
                        value={behavioralScores[idx]}
                        onChange={(e) => handleBehaviorChange(idx, e.target.value)}
                      >
                         <option value="Excellent">Excellent</option>
                         <option value="Good">Good</option>
                         <option value="Needs Improvement">Needs Improvement</option>
                       </select>
                     </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* SECTION 4: Final Educator Remarks */}
          <section className="bg-white pt-4 border-t border-slate-200 print:border-slate-300">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <FileText size={20} className="text-blue-600 print:text-slate-800"/>
              <h2 className="text-lg font-bold uppercase tracking-wider">Section 4: Final Educator Remarks</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Class Teacher's Comment</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 print:border-none print:p-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] print:min-h-0 print:resize-none text-slate-800"
                  placeholder="Provide a holistic view of academic progress and personal development here..."
                  value={classTeacherComment}
                  onChange={(e) => setClassTeacherComment(e.target.value)}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Form Tutor / Head of School Comment</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 print:border-none print:p-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] print:min-h-0 print:resize-none text-slate-800"
                    placeholder="Final official sign-off remarks..."
                    value={formTutorComment}
                    onChange={(e) => setFormTutorComment(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="flex flex-col justify-end space-y-4">
                  <div className="border-b border-gray-400 pb-1 h-10 flex items-end">
                    <span className="text-xs text-gray-400 italic">Signature</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <FormInput label="Educator Name" placeholder="Printed Name" value={educatorName} onChange={(e) => setEducatorName(e.target.value)} />
                     <FormInput label="Date" type="date" value={signDate} onChange={(e) => setSignDate(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
        
        <div className="bg-slate-100 print:bg-white border-t border-slate-200 text-center py-4 text-sm text-slate-500 print:hidden">
          Powered by Zurura Kids: Durham International School
        </div>
      </div>
    </div>
  );
}