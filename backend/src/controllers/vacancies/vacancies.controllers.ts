import axios from "axios";
import { BASE_URL, KZ_URL } from "../../core/constants/apihh";
import { Request, Response } from "express";
import { captureRejectionSymbol } from "events";
import fs from 'fs'
const getVacancies = (req: Request, res: Response) => {
    try{
        axios.get(`${BASE_URL}vacancies${KZ_URL}&clusters=true&only_with_salary=true&enable_snippets=true&st=searchVacancy&text=backend+developer&search_field=name&per_page=100`, {
            "headers":{
                'User-Agent': 'user-agent'
            }
        }).then((res) => {
            const responseData = res.data
            const jsonData = JSON.stringify(responseData, null, 2);

            // Write the JSON data to a file
            fs.writeFile('data.json', jsonData, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log(`Response data saved to`);
                }
        })
    })
    }catch(err){
        console.log(err)
    }
}

export default getVacancies