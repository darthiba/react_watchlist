import React from 'react'
import axios from 'axios'

const key = '7c1ab8d2eca1eee41959f5811b202f2d'
let id = '332349'

export default function useApi() {
    return{
        async getMovie(){

            return axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
            )
        },
        async getMovies(title){
            
            return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${title}`)
        }
    } 

}