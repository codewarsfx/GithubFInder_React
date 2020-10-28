import React, { useState, useEffect, createContext, } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';







const GithubContext= createContext()



const GithubProvider=({children})=>{ 

    const [githubUser, setGithubUser]=useState(mockUser)
    const [repo, setRepo]= useState(mockRepos)
    const [followers,setFollowers]=useState(mockFollowers)
    const [request,setRequest]=useState(0)
    const [error,setError]=useState({show:false,msg:''})
    const [isloading,setisLoading]=useState(false)

    const toggleError=(msg="",show=false)=>{
        setError({msg,show})
    }

    const getRequestRemaining=()=>{
            axios
            .get(`${rootUrl}/rate_limit`)
            .then(({data})=>{
                const {rate:{remaining}}=data
                setRequest(remaining)
                if(remaining===0){
                    toggleError("sorry you have exceeded the number of requests allowed per hour",true)    
                }
                
            }).catch(error=>{
                console.log(error)
            })    
        }



    const getUser=async(user)=>{
        toggleError()
        setisLoading(true)
        
        const userData=await axios(`${rootUrl}/users/${user}`).catch((error)=>{
            console.log(error)
        })

        if(userData){
            setGithubUser(userData.data)
            const {login}= userData.data

           await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`),axios(`${rootUrl}/users/${login}/followers`)])
           .then(result=>{

               const [reposData,followersData]= result
               const status="fulfilled"
               if(reposData.status===status){
                   setRepo(reposData.value.data)
               }
                    if(followersData.status===status){
                   setFollowers(followersData.value.data)
               } 
               setisLoading(false)
           })

            }
        else{
            setisLoading(false)
            toggleError("Github user doesn't exist",true)
        }
        getRequestRemaining()
    }

  useEffect(getRequestRemaining,[])


  
    return(
        <GithubContext.Provider value={{githubUser,repo,followers,request,error,getUser,isloading}}>{children}</GithubContext.Provider>
    )
}


export {GithubContext,GithubProvider}




