// Copyright (c) Yahilo. and its affiliates.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import  fs from "fs"
import path, { resolve } from "path"


export const getSharedModules = async (options) => {
  return new Promise(async (resolve, reject) => {
    try {
    
      if (isEmptyObject(options)) throw new Error("invalid option");
  
      const {sharedDir} = options;
      let sharedModulesPath = path.join(sharedDir)
      let functionsObj={}
      let fileLoadingPromise=[]
      
     fileLoadingPromise=fs.readdirSync(sharedModulesPath).map(async file => {
      return new Promise(async (resolve,reject)=>{
        try{
          const fileStats=fs.statSync(file)
          if(fileStats.isDirectory()){
          let indexPath=sharedModulesPath+`/${file}/index.js`
          const module = await import(indexPath)
          functionsObj={...functionsObj,...module.default}
          }
          return resolve({})
        }catch(err){
          reject(err);
        }
      })
       
        })

    await Promise.allSettled(fileLoadingPromise)
    return resolve(functionsObj)
  
    } catch (error) {
      reject(error);
    }
  });

};

export const isEmptyObject = (val) => {
  return (
    val == null ||
    typeof val !== "object" ||
    (typeof val === "object" && Object.keys(val).length === 0)
  );
};

await getSharedModules({sharedDir:"./"})






