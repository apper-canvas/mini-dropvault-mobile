import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Shield, Scale, Users, AlertTriangle, Globe } from 'lucide-react';
import jsPDF from 'jspdf';

const Terms = () => {
  const downloadPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = 30;

    // Helper function to add text with word wrapping
    const addText = (text, fontSize = 12, isBold = false) => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      
      // Check if we need a new page
      if (yPosition + (lines.length * (fontSize * 0.5)) > pdf.internal.pageSize.height - 30) {
        pdf.addPage();
        yPosition = 30;
      }
      
      pdf.text(lines, margin, yPosition);
      yPosition += lines.length * (fontSize * 0.5) + 5;
    };

    // Add title
    addText('DROPVAULT TERMS AND CONDITIONS', 18, true);
    yPosition += 10;
    addText(`Last updated: ${new Date().toLocaleDateString()}`, 10);
    yPosition += 15;

    // Add sections
    const sections = [
      {
        title: '1. ACCEPTANCE OF TERMS',
        content: 'By accessing and using DropVault, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
      },
      {
        title: '2. USE LICENSE',
        content: 'Permission is granted to temporarily download one copy of DropVault per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to reverse engineer any software contained in DropVault; or remove any copyright or other proprietary notations from the materials.'
      },
      {
        title: '3. USER ACCOUNTS',
        content: 'When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.'
      },
      {
        title: '4. PROHIBITED USES',
        content: 'You may not use our service: for any unlawful purpose or to solicit others to perform unlawful acts; to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances; to infringe upon or violate our intellectual property rights or the intellectual property rights of others; to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate; to submit false or misleading information; to upload or transmit viruses or any other type of malicious code.'
      },
      {
        title: '5. INTELLECTUAL PROPERTY',
        content: 'The service and its original content, features, and functionality are and will remain the exclusive property of DropVault and its licensors. The service is protected by copyright, trademark, and other laws.'
      },
      {
        title: '6. PRIVACY POLICY',
        content: 'Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.'
      },
      {
        title: '7. DISCLAIMERS',
        content: 'The information on DropVault is provided on an "as is" basis. To the fullest extent permitted by law, DropVault excludes all representations, warranties, conditions and terms whether express or implied.'
      },
      {
        title: '8. LIMITATION OF LIABILITY',
        content: 'In no event shall DropVault, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.'
      },
      {
        title: '9. TERMINATION',
        content: 'We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.'
      },
      {
        title: '10. GOVERNING LAW',
        content: 'These terms shall be governed and construed in accordance with the laws of the jurisdiction in which DropVault operates, without regard to its conflict of law provisions.'
      },
      {
        title: '11. CHANGES TO TERMS',
        content: 'We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.'
      },
      {
        title: '12. CONTACT INFORMATION',
        content: 'If you have any questions about these Terms and Conditions, please contact us at legal@dropvault.com.'
      }
    ];

    sections.forEach(section => {
      addText(section.title, 14, true);
      yPosition += 5;
      addText(section.content, 11);
      yPosition += 10;
    });

    // Save the PDF
    pdf.save('DropVault-Terms-and-Conditions.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-surface-900 dark:via-surface-800 dark:to-indigo-900 transition-all duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-surface-800 dark:text-surface-100 mb-2">
                Terms and Conditions
              </h1>
              <p className="text-surface-600 dark:text-surface-400">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            
            <button
              onClick={downloadPDF}
              className="btn-primary inline-flex items-center gap-2 shrink-0"
            >
              <Download size={20} />
              Download PDF
            </button>
          </div>
        </div>

        {/* Terms Content */}
        <div className="card p-8 lg:p-12 space-y-8">
          {/* Introduction */}
          <div className="border-l-4 border-primary pl-6">
            <p className="text-surface-700 dark:text-surface-300 text-lg leading-relaxed">
              Welcome to DropVault. These terms and conditions outline the rules and regulations 
              for the use of DropVault's file management platform. By accessing this website, 
              we assume you accept these terms and conditions. Do not continue to use DropVault 
              if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </div>

          {/* Section 1: Acceptance of Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">
                1. Acceptance of Terms
              </h2>
            </div>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
              By accessing and using DropVault, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>
          </section>

          {/* Section 2: Use License */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">
                2. Use License
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                Permission is granted to temporarily download one copy of DropVault per device 
                for personal, non-commercial transitory viewing only. This is the grant of a license, 
                not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained in DropVault</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>
          </section>

          {/* Section 3: User Accounts */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">
                3. User Accounts
              </h2>
            </div>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
              When you create an account with us, you must provide information that is accurate, 
              complete, and current at all times. You are responsible for safeguarding the password 
              and for all activities that occur under your account.
            </p>
          </section>

          {/* Section 4: Prohibited Uses */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">
                4. Prohibited Uses
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                You may not use our service:
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300 ml-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Intellectual Property */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Scale className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">
                5. Intellectual Property
              </h2>
            </div>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
              The service and its original content, features, and functionality are and will remain 
              the exclusive property of DropVault and its licensors. The service is protected by 
              copyright, trademark, and other laws.
            </p>
          </section>

          {/* Section 6: Privacy Policy */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Shield className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">
                6. Privacy Policy
              </h2>
            </div>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
              Your privacy is important to us. Please review our{' '}
              <Link to="/privacy" className="text-primary hover:text-primary-dark underline">
                Privacy Policy
              </Link>
              , which also governs your use of the service, to understand our practices.
            </p>
          </section>

          {/* Section 7: Disclaimers */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">
                7. Disclaimers
              </h2>
            </div>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
              The information on DropVault is provided on an "as is" basis. To the fullest extent 
              permitted by law, DropVault excludes all representations, warranties, conditions and 
              terms whether express or implied.
            </p>
          </section>

          {/* Section 8: Limitation of Liability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-teal-500/10 rounded-lg">
                <Scale className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">
                8. Limitation of Liability
              </h2>
            </div>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
              In no event shall DropVault, nor its directors, employees, partners, agents, suppliers, 
              or affiliates, be liable for any indirect, incidental, special, consequential, or 
              punitive damages, including without limitation, loss of profits, data, use, goodwill, 
              or other intangible losses.
            </p>
          </section>

          {/* Section 9: Termination */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-pink-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-pink-600" />
              </div>
              <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">
                9. Termination
              </h2>
            </div>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
              We may terminate or suspend your account and bar access to the service immediately, 
              without prior notice or liability, under our sole discretion, for any reason whatsoever.
            </p>
          </section>

          {/* Section 10: Governing Law */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Globe className="w-5 h-5 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">
                10. Governing Law
              </h2>
            </div>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
              These terms shall be governed and construed in accordance with the laws of the 
              jurisdiction in which DropVault operates, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Section 11: Changes to Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <FileText className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">
                11. Changes to Terms
              </h2>
            </div>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these terms at any time. 
              If a revision is material, we will provide at least 30 days notice prior to any new terms 
              taking effect.
            </p>
          </section>

          {/* Section 12: Contact Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">
                12. Contact Information
              </h2>
            </div>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us at{' '}
              <a href="mailto:legal@dropvault.com" className="text-primary hover:text-primary-dark underline">
                legal@dropvault.com
              </a>
              .
            </p>
          </section>

          {/* Footer */}
          <div className="border-t border-surface-200 dark:border-surface-700 pt-8 mt-12">
            <div className="text-center">
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                Thank you for using DropVault. These terms help us provide better service to all our users.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
                <Link 
                  to="/privacy" 
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  Privacy Policy
                </Link>
                <button
                  onClick={downloadPDF}
                  className="text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-2"
                >
                  <Download size={16} />
                  Download as PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;