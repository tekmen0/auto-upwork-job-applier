
# Directory Structure

```
upwork-job-applier/
│
├── docs/                      
│
├── public/                     
│   ├── icons/                 
│   ├── popup.html             
│   ├── options.html           
│   ├── manifest.json          
│   └── content-style.css      
│
├── src/                        
│   ├── background/             
│   │   └── index.js            
│   │
│   ├── content-scripts/        
│   │   └── autofill.js         
│   │
│   ├── popup/                  
│   │   ├── index.js            
│   │   └── style.css           
│   │
│   ├── options/                
│   │   ├── index.js            
│   │   └── style.css           
│   │
│   └── utils/                  
│       └── api.js              
│
├── docs/                        # Documentation files
│   ├── setup.md                 # Setup and installation instructions
│   ├── architecture.md          # Explanation of project architecture
│   ├── contributing.md          # Guidelines for contributing to the project
│   └── api.md                   # Details about the Groq API integration
│
├── tests/                      
│   ├── content-scripts.test.js 
│   └── utils.test.js           
│
├── .gitignore                  
├── package.json                
├── webpack.config.js           
├── README.md                   
└── LICENSE                     
```