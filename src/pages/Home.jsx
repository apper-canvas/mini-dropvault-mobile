import { useState } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'

const Home = ({ darkMode, setDarkMode }) => {
  const [storageUsed] = useState(2.4) // GB
  const [storageLimit] = useState(10) // GB

  const storagePercentage = (storageUsed / storageLimit) * 100

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b border-surface-200/50 dark:border-surface-700/50 bg-white/30 dark:bg-surface-900/30 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-card">
                <ApperIcon name="Vault" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold gradient-text">DropVault</h1>
                <p className="text-xs text-surface-500 dark:text-surface-400 hidden sm:block">Secure File Management</p>
              </div>
            </motion.div>

            {/* Storage Info & Dark Mode Toggle */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              {/* Storage Indicator */}
              <div className="hidden md:flex items-center space-x-3 bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-surface-200/30 dark:border-surface-700/30">
                <ApperIcon name="HardDrive" size={18} className="text-surface-600 dark:text-surface-400" />
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      {storageUsed}GB / {storageLimit}GB
                    </span>
                  </div>
                  <div className="w-20 h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${storagePercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="w-10 h-10 lg:w-12 lg:h-12 bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-surface-200/30 dark:border-surface-700/30 hover:border-primary/30 transition-all duration-200"
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  size={20} 
                  className="text-surface-600 dark:text-surface-400" 
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-surface-900 dark:text-white mb-4 lg:mb-6">
            Your Files, <span className="gradient-text">Organized</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto leading-relaxed">
            Upload, organize, and manage your files with our secure cloud platform. 
            Drag, drop, and go.
          </p>
        </motion.div>

        {/* Main Feature Component */}
        <MainFeature />

        {/* Quick Stats */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-12 lg:mt-16"
        >
          {[
            { icon: "Shield", label: "Secure", value: "256-bit SSL", color: "text-green-500" },
            { icon: "Zap", label: "Fast Upload", value: "100MB/s", color: "text-yellow-500" },
            { icon: "Users", label: "Team Ready", value: "Share Easy", color: "text-blue-500" },
            { icon: "Clock", label: "24/7 Access", value: "Always On", color: "text-purple-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card p-4 lg:p-6 text-center group cursor-pointer"
            >
              <ApperIcon 
                name={stat.icon} 
                size={32} 
                className={`${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`} 
              />
              <h3 className="font-semibold text-surface-900 dark:text-white text-sm lg:text-base mb-1">
                {stat.label}
              </h3>
              <p className="text-surface-600 dark:text-surface-400 text-xs lg:text-sm">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}

export default Home