import React, { useState, useEffect } from 'react';
import { Award, BookOpen, Download, FileText, Printer, User } from 'lucide-react';

export default function App() {
  const [keyStage, setKeyStage] = useState('early_years');

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
    
    // Add School Header
    csvContent += "SHAH LALJI NANGPAR ACADEMY - HOLISTIC REPORT CARD\n\n";
    
    // Add Student Details Section
    csvContent += "STUDENT DETAILS\n";
    csvContent += "Student Name,Age,Class,Admission Number\n";
    csvContent += "Jackson Connor,4,Pre-K,ADM-2026\n\n"; // Mock data
    
    // Adapt Excel rows based on Key Stage
    if (keyStage === 'early_years') {
      csvContent += "ACADEMIC PROGRESS - EARLY YEARS\n";
      csvContent += "Category,Milestone,Grading (1-3),Notes\n";
      csvContent += "Communications,Speaks clearly,3,Acing it!\n";
      csvContent += "Motor Skills,Writes with pencil,2,Steady improvement\n";
    } else if (keyStage === 'junior') {
      csvContent += "ACADEMIC PROGRESS - JUNIOR SCHOOL\n";
      csvContent += "Subject,MTE,ETE,TA %,Grade\n";
      csvContent += "English,85,88,86.5,A2\n";
      csvContent += "Mathematics,92,95,93.5,A1\n";
      csvContent += "Science,78,82,80,A2\n";
    } else if (keyStage === 'senior') {
      csvContent += "ACADEMIC PROGRESS - SENIOR SCHOOL\n";
      csvContent += "Syllabus Code,Syllabus Title,Result %,Uniform Mark\n";
      csvContent += "0580,Mathematics,94,A*\n";
      csvContent += "0450,Business Studies,88,A\n";
    }

    // Trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Report_Card_${keyStage}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for rendering a standard input
  const FormInput = ({ label, type = "text", placeholder }) => (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-transparent print:resize-none font-medium text-slate-800"
      />
    </div>
  );

  return (
    // We remove the gray background and padding when printing so it fills the page cleanly
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans print:bg-white print:p-0">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden print:shadow-none">
        
        {/* Header */}
        <div className="bg-slate-800 text-white p-6 flex justify-between items-center print:bg-white print:text-slate-800 print:border-b-2 print:border-slate-800 print:px-0">
          <div>
            <h1 className="text-2xl font-bold font-serif tracking-wide">UNIVERSAL HOLISTIC REPORT CARD</h1>
            <p className="text-slate-300 print:text-slate-500 mt-1 text-sm">Shah Lalji Nangpar Academy Framework</p>
          </div>
          
          {/* These controls are completely hidden on the printed PDF */}
          <div className="flex items-end gap-3 print:hidden">
            <div className="flex flex-col items-end mr-2">
              <label className="text-sm font-semibold text-slate-300 mb-1">Select Key Stage:</label>
              <select 
                className="bg-white text-slate-800 px-3 py-2 rounded-md font-semibold focus:outline-none cursor-pointer"
                value={keyStage}
                onChange={(e) => setKeyStage(e.target.value)}
              >
                <option value="early_years">Early Years (Ages 3-6)</option>
                <option value="junior">Junior & Middle (Ages 7-13)</option>
                <option value="senior">Senior School (Ages 14-18)</option>
              </select>
            </div>
            
            {/* THE EXCEL BUTTON */}
            <button 
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 h-[40px] rounded-md font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              title="Download as Excel (CSV)"
            >
              <Download size={18} />
              <span>Excel</span>
            </button>

            {/* THE PRINT BUTTON */}
            <button 
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 h-[40px] rounded-md font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              title="Save as PDF or Print"
            >
              <Printer size={18} />
              <span>Print</span>
            </button>
          </div>
        </div>

        <div className="p-8 print:p-0 print:pt-6 space-y-8 print:space-y-6">
          
          {/* SECTION 1: Universal Student Details */}
          <section className="bg-slate-50 print:bg-white p-6 print:p-0 rounded-lg border border-slate-200 print:border-none">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <User size={20} className="text-blue-600 print:text-slate-800"/>
              <h2 className="text-lg font-bold uppercase tracking-wider">Section 1: Student Details & Attendance</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <FormInput label="Student Name" placeholder="e.g. Jackson Connor" />
              <FormInput label="Age" type="number" placeholder="e.g. 4" />
              <FormInput label="Class" placeholder="e.g. Pre-K" />
              <FormInput label="Admission Number" placeholder="e.g. ADM-2026" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
              <FormInput label="Assessment Period" placeholder="e.g. End of Term II 2026" />
              <FormInput label="Total Days" type="number" placeholder="e.g. 90" />
              <FormInput label="Days Attended" type="number" placeholder="e.g. 85" />
              <FormInput label="% Attendance" placeholder="e.g. 94.4%" />
            </div>
          </section>

          {/* SECTION 2: Academic & Developmental Progress */}
          <section className="bg-white">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <BookOpen size={20} className="text-blue-600 print:text-slate-800"/>
              <h2 className="text-lg font-bold uppercase tracking-wider">Section 2: Academic Progress</h2>
            </div>

            {/* EARLY YEARS */}
            {keyStage === 'early_years' && (
              <div className="space-y-6">
                <p className="text-sm text-gray-500 italic mb-2 print:hidden">Focuses on granular developmental milestones with a 1-3 star visual grading system.</p>
                
                {['Communications', 'Numerics & Color/Shapes', 'Motor Skills', 'Reading/Writing'].map((category, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-md overflow-hidden">
                    <div className="bg-blue-50 print:bg-slate-100 px-4 py-2 font-bold text-blue-800 print:text-slate-800 border-b border-gray-200 print:border-slate-300">{category}</div>
                    <div className="grid grid-cols-12 gap-0 bg-gray-50 print:bg-white text-xs font-semibold text-gray-600 print:text-slate-700 border-b border-gray-200 print:border-slate-300">
                      <div className="col-span-4 p-2">Milestone</div>
                      <div className="col-span-3 p-2 border-l border-gray-200 print:border-slate-300">Grading (1-3)</div>
                      <div className="col-span-5 p-2 border-l border-gray-200 print:border-slate-300">Educator Notes</div>
                    </div>
                    {[1, 2].map((row) => (
                      <div key={row} className="grid grid-cols-12 gap-0 border-b border-gray-100 print:border-slate-200 last:border-0">
                        <div className="col-span-4 p-2"><input className="w-full text-sm outline-none bg-transparent" placeholder={`Enter ${category} milestone...`} /></div>
                        <div className="col-span-3 p-2 border-l border-gray-100 print:border-slate-200 flex items-center gap-2">
                          <select className="text-sm bg-transparent outline-none w-full text-yellow-500 print:text-slate-800 font-bold print:appearance-none cursor-pointer">
                            <option value="3">★★★ (Acing it)</option>
                            <option value="2">★★☆ (Steady)</option>
                            <option value="1">★☆☆ (Needs Support)</option>
                          </select>
                        </div>
                        <div className="col-span-5 p-2 border-l border-gray-100 print:border-slate-200"><input className="w-full text-sm outline-none bg-transparent" placeholder="Observation notes..." /></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* JUNIOR */}
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
                      {['English', 'Mathematics', 'Science', 'Computing', 'Art & Design', 'French', 'Geography', 'History', 'Music'].map((subject, idx) => (
                        <tr key={idx} className="border-b border-gray-100 print:border-slate-200 last:border-0 hover:bg-slate-50">
                          <td className="p-3 border-r border-gray-100 print:border-slate-200 font-medium text-slate-800">{subject}</td>
                          <td className="p-2 border-r border-gray-100 print:border-slate-200"><input className="w-full text-center outline-none bg-transparent" placeholder="-" /></td>
                          <td className="p-2 border-r border-gray-100 print:border-slate-200"><input className="w-full text-center outline-none bg-transparent" placeholder="-" /></td>
                          <td className="p-2 border-r border-gray-100 print:border-slate-200"><input className="w-full text-center outline-none bg-transparent" placeholder="-" /></td>
                          <td className="p-2"><input className="w-full text-center font-bold text-slate-700 outline-none bg-transparent" placeholder="-" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-xs text-slate-500 print:text-slate-800 bg-slate-50 print:bg-white p-2 rounded print:border print:border-slate-200">
                  <strong>Grading Key:</strong> 90-100: A1 | 80-89: A2 | 70-79: B1 | 60-69: B2 | 50-59: C1 | 40-49: C2 | 30-39: D1 | 20-29: D2 | Below 20: E
                </div>
              </div>
            )}

            {/* SENIOR */}
            {keyStage === 'senior' && (
              <div>
                <p className="text-sm text-gray-500 italic mb-2 print:hidden">Streamlined quantitative view for standardized testing and higher education preparation.</p>
                <div className="mb-4 flex gap-4">
                  <FormInput label="Examination Board & Level" placeholder="e.g. Cambridge IGCSE" />
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
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                        <tr key={row} className="border-b border-gray-100 print:border-slate-200 last:border-0 hover:bg-slate-50">
                          <td className="p-2 border-r border-gray-100 print:border-slate-200"><input className="w-full outline-none bg-transparent" placeholder="e.g. 0580" /></td>
                          <td className="p-2 border-r border-gray-100 print:border-slate-200"><input className="w-full outline-none bg-transparent" placeholder="e.g. Mathematics" /></td>
                          <td className="p-2 border-r border-gray-100 print:border-slate-200"><input className="w-full text-center outline-none bg-transparent" placeholder="-" /></td>
                          <td className="p-2"><input className="w-full text-center outline-none bg-transparent font-bold" placeholder="-" /></td>
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
                      <input className="w-full mt-1 p-2 border border-orange-200 print:border-slate-300 print:border-none print:px-0 rounded text-sm outline-none bg-transparent" placeholder="Add observation notes..." />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Can express issues and concerns calmly</label>
                      <input className="w-full mt-1 p-2 border border-orange-200 print:border-slate-300 print:border-none print:px-0 rounded text-sm outline-none bg-transparent" placeholder="Add observation notes..." />
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
                            <select className="w-full p-2 border border-gray-200 print:border-none rounded bg-white text-center font-bold text-slate-700 focus:outline-none cursor-pointer print:appearance-none">
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
                  {['Cooperate with Peers', 'Cooperate with Teachers', 'Discipline / Behaviour', 'Grooming & Appearance'].map(item => (
                     <div key={item} className="flex flex-col">
                       <label className="text-xs font-semibold text-gray-600 mb-1">{item}</label>
                       <select className="p-2 border border-gray-200 print:border-none print:px-0 rounded text-sm bg-white outline-none cursor-pointer print:appearance-none font-medium text-slate-800">
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
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Form Tutor / Head of School Comment</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 print:border-none print:p-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] print:min-h-0 print:resize-none text-slate-800"
                    placeholder="Final official sign-off remarks..."
                  ></textarea>
                </div>
                
                <div className="flex flex-col justify-end space-y-4">
                  <div className="border-b border-gray-400 pb-1 h-10 flex items-end">
                    <span className="text-xs text-gray-400 italic">Signature</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <FormInput label="Educator Name" placeholder="Printed Name" />
                     <FormInput label="Date" type="date" />
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
        
        <div className="bg-slate-100 print:bg-white border-t border-slate-200 text-center py-4 text-sm text-slate-500 print:hidden">
          Generated via Holistic School Report Card Framework
        </div>
      </div>
    </div>
  );
}