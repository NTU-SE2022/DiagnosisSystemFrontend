import axios from 'axios';

const config = {
    // baseURL: "https://diagnosis-back.host.chillmonkey.com.tw/api/patientAddresses",
    baseURL:"http://localhost:3000/testdata/testSymptom.json"
}

export default function SymptomList(){
    axios(config).then((response) =>{
        let symptomList = response.data.response.symptom;
        symptomList.map((symptom) => symptom['level'] = null);
        console.log(symptomList)
        return symptomList
    }).catch((error)=>{
        console.log(error);
        return
    })
    // return(
    //         [
    //             { label: 'The Shawshank Redemption', level: null },
    //             { label: 'The Godfather', level: null },
    //         ]
    // );
};