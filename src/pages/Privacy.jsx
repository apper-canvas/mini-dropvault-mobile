import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Eye, Lock, Users, Clock, FileText } from 'lucide-react'

function Privacy() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-surface-900 dark:via-surface-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary to-purple-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">Privacy Policy</h1>
              <p className="text-surface-600 dark:text-surface-400 mt-1">
                How we protect and handle your data
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {/* Introduction */}
          <motion.section variants={fadeInUp} className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">
                Introduction
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-surface-700 dark:text-surface-300">
              <p>
                Welcome to DropVault. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you use our 
                file storage and management service.
              </p>
              <p>
                By using DropVault, you agree to the collection and use of information in accordance with this policy. 
                We will not use or share your information with anyone except as described in this privacy policy.
              </p>
            </div>
          </motion.section>

          {/* Data Collection */}
          <motion.section variants={fadeInUp} className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-3">
                  Personal Information
                </h3>
                <ul className="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
                  <li>Email address (for account creation and communication)</li>
                  <li>Name (optional, for personalization)</li>
                  <li>Profile picture (optional)</li>
                  <li>Account preferences and settings</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-3">
                  File and Usage Data
                </h3>
                <ul className="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
                  <li>Files you upload, including metadata (size, type, creation date)</li>
                  <li>Usage patterns and feature interactions</li>
                  <li>Device information and browser type</li>
                  <li>IP address and general location information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-3">
                  Automatically Collected Information
                </h3>
                <ul className="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
                  <li>Log data (access times, pages viewed, errors)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Performance and diagnostic information</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Data Usage */}
          <motion.section variants={fadeInUp} className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">
                How We Use Your Information
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-surface-800 dark:text-surface-200 mb-3">
                    Service Provision
                  </h3>
                  <ul className="text-sm space-y-1 text-surface-700 dark:text-surface-300">
                    <li>• File storage and management</li>
                    <li>• Account authentication</li>
                    <li>• Feature personalization</li>
                    <li>• Technical support</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-surface-800 dark:text-surface-200 mb-3">
                    Improvement & Analytics
                  </h3>
                  <ul className="text-sm space-y-1 text-surface-700 dark:text-surface-300">
                    <li>• Service optimization</li>
                    <li>• Bug fixes and updates</li>
                    <li>• Usage analytics</li>
                    <li>• New feature development</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h3 className="font-semibold text-surface-800 dark:text-surface-200 mb-3">
                    Communication
                  </h3>
                  <ul className="text-sm space-y-1 text-surface-700 dark:text-surface-300">
                    <li>• Service updates</li>
                    <li>• Security notifications</li>
                    <li>• Customer support</li>
                    <li>• Optional newsletters</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                  <h3 className="font-semibold text-surface-800 dark:text-surface-200 mb-3">
                    Legal Compliance
                  </h3>
                  <ul className="text-sm space-y-1 text-surface-700 dark:text-surface-300">
                    <li>• Regulatory requirements</li>
                    <li>• Terms of service enforcement</li>
                    <li>• Fraud prevention</li>
                    <li>• Legal proceedings</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Data Security */}
          <motion.section variants={fadeInUp} className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">
                Data Security
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-surface-700 dark:text-surface-300">
              <p>
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="grid md:grid-cols-2 gap-4 mt-4">
                <li className="flex items-start gap-3 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Encryption:</strong> All data is encrypted in transit and at rest using AES-256 encryption
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Access Control:</strong> Strict authentication and authorization protocols
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Regular Audits:</strong> Continuous security monitoring and vulnerability assessments
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Backup Systems:</strong> Redundant backups to prevent data loss
                  </div>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Data Retention */}
          <motion.section variants={fadeInUp} className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">
                Data Retention
              </h2>
            </div>
            <div className="space-y-4 text-surface-700 dark:text-surface-300">
              <p>
                We retain your personal information only as long as necessary for the purposes outlined in this policy:
              </p>
              <div className="bg-surface-50 dark:bg-surface-800/50 rounded-lg p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">Active Files</div>
                    <div className="text-sm">Retained while your account is active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">Account Data</div>
                    <div className="text-sm">30 days after account deletion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">Usage Logs</div>
                    <div className="text-sm">90 days for security purposes</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Your Rights */}
          <motion.section variants={fadeInUp} className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">
                Your Rights
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200">
                  Data Control
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-surface-700 dark:text-surface-300">
                      <strong>Access:</strong> Request a copy of your personal data
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-surface-700 dark:text-surface-300">
                      <strong>Rectification:</strong> Correct inaccurate information
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-surface-700 dark:text-surface-300">
                      <strong>Erasure:</strong> Request deletion of your data
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200">
                  Additional Rights
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-surface-700 dark:text-surface-300">
                      <strong>Portability:</strong> Export your data in a standard format
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-surface-700 dark:text-surface-300">
                      <strong>Restriction:</strong> Limit how we process your data
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-surface-700 dark:text-surface-300">
                      <strong>Objection:</strong> Opt out of certain data processing
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:privacy@dropvault.com" className="underline hover:no-underline">
                  privacy@dropvault.com
                </a>
              </p>
            </div>
          </motion.section>

          {/* Contact */}
          <motion.section variants={fadeInUp} className="card p-8">
            <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
              Contact Us
            </h2>
            <div className="prose prose-lg max-w-none text-surface-700 dark:text-surface-300">
              <p>
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="mt-4 p-6 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@dropvault.com</p>
                  <p><strong>Address:</strong> 123 Privacy Street, Data City, DC 12345</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  )
}

export default Privacy