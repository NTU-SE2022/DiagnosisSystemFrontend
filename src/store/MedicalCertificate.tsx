import * as React from 'react';
import { userWallet, backendInfo } from '..';
import Web3function from '../WEB3/Web3function';
import abijson from '../WEB3/MedicalCertificateAbi.json';
import Box from '@mui/material/Box';
import ContractActions from '../WEB3/ContractActions'

export interface Symptom{
    symptom: string;
    level: string;
}

export interface MedicalCertificate {
    id: string;
    address: string;
    symptoms: Symptom[];
}

interface ContractCallParam {
    method: string;
    param?: any[];
    callback: (res: any) => void;
}

interface Web3FunctionParam {
    connectContract: () => void;
    disconnectContract: () => void;
    callback: (para:ContractCallParam) => void;
}

export function AllMedicalCertificate() {
    const {
        isMetaMaskInstalled,
        provider,
        accounts,
        web3,
        enable,
        disable
    } = React.useContext(userWallet);

    const {
        ContractAddress
    } = React.useContext(backendInfo);

    const {contract,connectContract,disconnectContract,logcontract} = Web3function({web3:web3,accounts:accounts,abi:abijson,address:ContractAddress})
    const{contractCall} = ContractActions({contract:contract,accounts:accounts});
    const [connect,setConnect] = React.useState(false)
    React.useEffect(()=>{
        connectContract()
        setConnect(true)
    },[ContractAddress])

    React.useEffect(()=>{
        if (connect){
            getAllCertificateId();
        }
    }, [connect])
    
    const [allSymptoms, setallSymptoms] = React.useState<string[][]>([]);
    const [allLevels, setallLevels] = React.useState<string[][]>([]);
    const [allCertificateId, setallCertificateId] = React.useState<string[]>([]);

    React.useEffect(()=>{
        allCertificateId.map((id) => {getSymptoms(id); getLevels(id)})
    }, [allCertificateId])

    const getSymptoms = (id:string) => {
        contractCall({
            method: 'getSymptoms',
            param: [id],
            callback: (res) => {
                setallSymptoms(arr => [...arr, res.split(',')]);
            }
        });
    }

    const getLevels = (id:string) => {
        contractCall({
            method: 'getLevels',
            param: [id],
            callback: (res) => {
                setallLevels(arr => [...arr, res.split(',')]);
            }
        });
    }

    const getAllCertificateId = () => {
        contractCall({
            method: 'listCertificatesIdOfAddress',
            param: [accounts[0]],
            callback: (res) => {
                setallCertificateId(res);
            }
        });
    }
    
    if (allCertificateId.length > 0 && allCertificateId.length == allSymptoms.length && allCertificateId.length == allLevels.length){
        return allCertificateId.map<MedicalCertificate>(function(e,i){
            return {id:e,address:accounts[0],symptoms:allSymptoms[i].map<Symptom>(function(e,j){ return {symptom:e, level:allLevels[i][j]}})}
        })
    }

    return [];
}