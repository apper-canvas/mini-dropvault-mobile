import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [files, setFiles] = useState([])
  const [currentFolder, setCurrentFolder] = useState({ id: 'root', name: 'My Files', path: [] })
  const [folders, setFolders] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedItems, setSelectedItems] = useState([])
  const [showNewFolderModal, setShowNewFolderModal] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const fileInputRef = useRef(null)

  const getFileIcon = (type) => {
    const ext = type.toLowerCase()
    if (ext.includes('pdf')) return { icon: 'FileText', color: 'bg-red-500' }
    if (ext.includes('doc') || ext.includes('docx')) return { icon: 'FileText', color: 'bg-blue-600' }
    if (ext.includes('xls') || ext.includes('xlsx')) return { icon: 'Sheet', color: 'bg-green-600' }
    if (ext.includes('ppt') || ext.includes('pptx')) return { icon: 'Presentation', color: 'bg-orange-500' }
    if (ext.includes('image') || ext.includes('png') || ext.includes('jpg') || ext.includes('jpeg')) return { icon: 'Image', color: 'bg-purple-500' }
    if (ext.includes('video') || ext.includes('mp4') || ext.includes('avi')) return { icon: 'Video', color: 'bg-pink-500' }
    if (ext.includes('audio') || ext.includes('mp3') || ext.includes('wav')) return { icon: 'Music', color: 'bg-indigo-500' }
    if (ext.includes('zip') || ext.includes('rar')) return { icon: 'Archive', color: 'bg-gray-600' }
    return { icon: 'File', color: 'bg-surface-400' }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const simulateUpload = (file) => {
    const fileId = Date.now() + Math.random()
    let progress = 0
    
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        
        const newFile = {
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date(),
          folderId: currentFolder.id,
          downloadUrl: URL.createObjectURL(file),
          isPublic: false
        }
        
        setFiles(prev => [...prev, newFile])
        setUploadProgress(prev => {
          const updated = { ...prev }
          delete updated[fileId]
          return updated
        })
        
        toast.success(`${file.name} uploaded successfully!`)
      } else {
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }))
      }
    }, 100)
  }

  const handleFileUpload = (uploadFiles) => {
    Array.from(uploadFiles).forEach(file => {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast.error(`${file.name} is too large. Maximum file size is 100MB.`)
        return
      }
      simulateUpload(file)
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFiles = e.dataTransfer.files
    handleFileUpload(droppedFiles)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileSelect = (e) => {
    handleFileUpload(e.target.files)
    e.target.value = ''
  }

  const createFolder = () => {
    if (!newFolderName.trim()) {
      toast.error("Folder name cannot be empty")
      return
    }

    const newFolder = {
      id: Date.now().toString(),
      name: newFolderName.trim(),
      parentId: currentFolder.id,
      createdDate: new Date(),
      fileCount: 0,
      totalSize: 0
    }

    setFolders(prev => [...prev, newFolder])
    setNewFolderName('')
    setShowNewFolderModal(false)
    toast.success(`Folder "${newFolder.name}" created successfully!`)
  }

  const navigateToFolder = (folder) => {
    setCurrentFolder({
      id: folder.id,
      name: folder.name,
      path: [...currentFolder.path, { id: currentFolder.id, name: currentFolder.name }]
    })
    setSelectedItems([])
  }

  const navigateUp = (targetFolder) => {
    if (targetFolder) {
      const pathIndex = currentFolder.path.findIndex(p => p.id === targetFolder.id)
      setCurrentFolder({
        id: targetFolder.id,
        name: targetFolder.name,
        path: currentFolder.path.slice(0, pathIndex)
      })
    } else {
      setCurrentFolder({ id: 'root', name: 'My Files', path: [] })
    }
    setSelectedItems([])
  }

  const deleteSelected = () => {
    selectedItems.forEach(id => {
      setFiles(prev => prev.filter(f => f.id !== id))
      setFolders(prev => prev.filter(f => f.id !== id))
    })
    setSelectedItems([])
    toast.success(`${selectedItems.length} item(s) deleted successfully!`)
  }

  const toggleSelection = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const currentFiles = files.filter(f => f.folderId === currentFolder.id)
  const currentFolders = folders.filter(f => f.parentId === currentFolder.id)
  const hasSelectedItems = selectedItems.length > 0

  return (
    <div className="max-w-7xl mx-auto">
      {/* Action Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-4 lg:p-6 mb-6 lg:mb-8"
      >
        {/* Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <nav className="flex items-center space-x-2 text-sm overflow-x-auto">
            <button
              onClick={() => navigateUp()}
              className="flex items-center space-x-1 text-primary hover:text-primary-dark transition-colors duration-200"
            >
              <ApperIcon name="Home" size={16} />
              <span>My Files</span>
            </button>
            {currentFolder.path.map((folder, index) => (
              <div key={folder.id} className="flex items-center space-x-2">
                <ApperIcon name="ChevronRight" size={14} className="text-surface-400" />
                <button
                  onClick={() => navigateUp(folder)}
                  className="text-primary hover:text-primary-dark transition-colors duration-200 whitespace-nowrap"
                >
                  {folder.name}
                </button>
              </div>
            ))}
            {currentFolder.id !== 'root' && (
              <div className="flex items-center space-x-2">
                <ApperIcon name="ChevronRight" size={14} className="text-surface-400" />
                <span className="text-surface-600 dark:text-surface-400 whitespace-nowrap">{currentFolder.name}</span>
              </div>
            )}
          </nav>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              <ApperIcon name="Grid3X3" size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              <ApperIcon name="List" size={18} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary flex items-center justify-center space-x-2 text-sm lg:text-base"
          >
            <ApperIcon name="Upload" size={18} />
            <span>Upload Files</span>
          </button>
          
          <button
            onClick={() => setShowNewFolderModal(true)}
            className="btn-secondary flex items-center justify-center space-x-2 text-sm lg:text-base"
          >
            <ApperIcon name="FolderPlus" size={18} />
            <span>New Folder</span>
          </button>

          <AnimatePresence>
            {hasSelectedItems && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={deleteSelected}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-xl shadow-card hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 text-sm lg:text-base"
              >
                <ApperIcon name="Trash2" size={18} />
                <span>Delete ({selectedItems.length})</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </motion.div>

      {/* Upload Progress */}
      <AnimatePresence>
        {Object.keys(uploadProgress).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card p-4 lg:p-6 mb-6 lg:mb-8"
          >
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center space-x-2">
              <ApperIcon name="Upload" size={20} />
              <span>Uploading Files</span>
            </h3>
            {Object.entries(uploadProgress).map(([fileId, progress]) => (
              <div key={fileId} className="mb-3 last:mb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-surface-600 dark:text-surface-400">
                    Uploading file...
                  </span>
                  <span className="text-sm font-medium text-surface-900 dark:text-white">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drop Zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`file-drop-zone ${isDragOver ? 'drag-over' : ''} rounded-2xl p-8 lg:p-12 text-center mb-8 lg:mb-12 cursor-pointer transition-all duration-300`}
        onClick={() => fileInputRef.current?.click()}
      >
        <motion.div
          animate={{ 
            y: isDragOver ? -10 : 0,
            scale: isDragOver ? 1.05 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon name="CloudUpload" size={64} className="text-primary mx-auto mb-4" />
          <h3 className="text-xl lg:text-2xl font-semibold text-surface-900 dark:text-white mb-2">
            {isDragOver ? 'Drop files here!' : 'Drag & drop files here'}
          </h3>
          <p className="text-surface-600 dark:text-surface-400 text-sm lg:text-base">
            or click to browse • Support for all file types • Max 100MB per file
          </p>
        </motion.div>
      </motion.div>

      {/* File Grid/List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card p-4 lg:p-6"
      >
        {currentFolders.length === 0 && currentFiles.length === 0 ? (
          <div className="text-center py-12 lg:py-16">
            <ApperIcon name="FolderOpen" size={64} className="text-surface-300 dark:text-surface-600 mx-auto mb-4" />
            <h3 className="text-lg lg:text-xl font-semibold text-surface-600 dark:text-surface-400 mb-2">
              This folder is empty
            </h3>
            <p className="text-surface-500 dark:text-surface-500 text-sm lg:text-base">
              Upload files or create folders to get started
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6'
              : 'space-y-2'
          }>
            {/* Folders */}
            {currentFolders.map((folder) => (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1 }}
                className={
                  viewMode === 'grid'
                    ? 'file-item p-4 text-center cursor-pointer'
                    : 'file-item p-4 cursor-pointer flex items-center space-x-4'
                }
                onDoubleClick={() => navigateToFolder(folder)}
                onClick={() => toggleSelection(folder.id)}
              >
                <div className={`${selectedItems.includes(folder.id) ? 'ring-2 ring-primary' : ''} rounded-lg`}>
                  {viewMode === 'grid' ? (
                    <>
                      <ApperIcon name="Folder" size={48} className="text-primary mx-auto mb-3" />
                      <h4 className="font-medium text-surface-900 dark:text-white text-sm truncate">
                        {folder.name}
                      </h4>
                      <p className="text-xs text-surface-500 dark:text-surface-500 mt-1">
                        {formatDistanceToNow(folder.createdDate, { addSuffix: true })}
                      </p>
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Folder" size={32} className="text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-surface-900 dark:text-white truncate">
                          {folder.name}
                        </h4>
                        <p className="text-sm text-surface-500 dark:text-surface-500">
                          {formatDistanceToNow(folder.createdDate, { addSuffix: true })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigateToFolder(folder)
                          }}
                          className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors duration-200"
                        >
                          <ApperIcon name="ChevronRight" size={16} className="text-surface-400" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Files */}
            {currentFiles.map((file) => {
              const fileIcon = getFileIcon(file.type)
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1 }}
                  className={
                    viewMode === 'grid'
                      ? 'file-item p-4 text-center cursor-pointer'
                      : 'file-item p-4 cursor-pointer flex items-center space-x-4'
                  }
                  onClick={() => toggleSelection(file.id)}
                >
                  <div className={`${selectedItems.includes(file.id) ? 'ring-2 ring-primary' : ''} rounded-lg`}>
                    {viewMode === 'grid' ? (
                      <>
                        <div className={`w-12 h-12 ${fileIcon.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                          <ApperIcon name={fileIcon.icon} size={24} className="text-white" />
                        </div>
                        <h4 className="font-medium text-surface-900 dark:text-white text-sm truncate" title={file.name}>
                          {file.name}
                        </h4>
                        <p className="text-xs text-surface-500 dark:text-surface-500 mt-1">
                          {formatFileSize(file.size)}
                        </p>
                        <p className="text-xs text-surface-400 dark:text-surface-600">
                          {formatDistanceToNow(file.uploadDate, { addSuffix: true })}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className={`w-10 h-10 ${fileIcon.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <ApperIcon name={fileIcon.icon} size={20} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-surface-900 dark:text-white truncate" title={file.name}>
                            {file.name}
                          </h4>
                          <p className="text-sm text-surface-500 dark:text-surface-500">
                            {formatFileSize(file.size)} • {formatDistanceToNow(file.uploadDate, { addSuffix: true })}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <a
                            href={file.downloadUrl}
                            download={file.name}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors duration-200"
                          >
                            <ApperIcon name="Download" size={16} className="text-surface-400" />
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>

      {/* New Folder Modal */}
      <AnimatePresence>
        {showNewFolderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewFolderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">
                Create New Folder
              </h3>
              
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name"
                className="w-full px-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && createFolder()}
                autoFocus
              />
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowNewFolderModal(false)}
                  className="btn-secondary text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={createFolder}
                  className="btn-primary text-sm"
                  disabled={!newFolderName.trim()}
                >
                  Create Folder
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature