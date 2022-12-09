import * as React from 'react';
import { userWallet } from '..';
import Web3function from '../WEB3/Web3function';
import abijson from '../WEB3/MedicalCertificateAbi.json';
import Box from '@mui/material/Box';
import ContractActions from '../WEB3/ContractActions'

export function BorderBox(props:any){

    return(
        <Box
        sx={{
        boxShadow: 3,
        width: '12rem',
        height: '10rem',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        p: 1,
        m: 1,
        borderRadius: 2,
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: '700',
        }}
        >
            <BorderBoxContent value={props.value}/>
        </Box>
    )
}

function BorderBoxContent(props:any){
    return(
        <Box flex={1} sx={{height:'100%',textAlign:'left' ,overflow:"auto"}}>
        <Box component="p">id:{props.value.id}</Box>
        <Box component="p">address:{props.value.address}</Box>
        <Box component="p">symptoms:{props.value.symptoms}</Box>
        <Box component="p">levels:{props.value.levels}</Box>
        {/* <Box component="p">Category:{props.value.category}</Box>
        <Box component='p'>Feature:{props.value.feature.map((policy=>(<Box component='li'>{policy}</Box>)))}</Box>
        <Box component='p'>Coverage:{props.value.coverage.map((policy=>(<Box component='li'>{policy}</Box>)))}</Box> */}
        </Box>
    )
}

export interface MedicalCertificate {
    id: string;
    address: string;
    symptoms: string;
    levels: string;
}

export interface ContractInfo{
    address: string;
    patient: string;
}

export interface CertificatesInfo{
    address: string
    ids: string[];
    patientAddress: string;
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

interface MedicalCertificateContract {
    (info: ContractInfo): MedicalCertificate[];
}

export const ContractImplementation: MedicalCertificateContract = function (info: ContractInfo){
    const {
        isMetaMaskInstalled,
        provider,
        accounts,
        web3,
        enable,
        disable
    } = React.useContext(userWallet);

    const {contract,connectContract,disconnectContract,logcontract} = Web3function({web3:web3,accounts:accounts,abi:abijson,address:info.address})
    const{contractCall} = ContractActions({contract:contract,accounts:accounts});
    const [connect,setConnect] = React.useState(false)
    React.useEffect(()=>{
        connectContract()
        setConnect(true)
        console.log("constructor: " + info.address + " " + info.patient);
    },[info.address])

    function listAllCertificate(patient: string) {
        const [symptoms, setsymptoms] = React.useState<string>('');
        const [levels, setlevels] = React.useState<string>('');
        const [allCertificateId, setallCertificateId] = React.useState<string[]>([]);

        const getSymtoms = (id:string) => {
            contractCall({
                method: 'getSymptoms',
                param: [id],
                callback: (res) => {
                    setsymptoms(res);
                }
            });
            return symptoms;
        }

        const getLevels = (id:string) => {
            contractCall({
                method: 'getLevels',
                param: [id],
                callback: (res) => {
                    setlevels(res);
                }
            });
            return levels;
        }

        const getAllCertificateId = () => {
            // var allCertificateId: any;
            contractCall({
                method: 'listCertificatesIdOfAddress',
                param: [patient],
                callback: (res) => {
                    setallCertificateId(res);
                }
            });
            // return allCertificateId;
        }

        React.useEffect(()=>{
            if (connect){
                getAllCertificateId();
                console.log("listAllCertificate");
            }
        }, [connect])

        return(
            allCertificateId.map<MedicalCertificate>((id) => ({id:id,address:patient,symptoms:getSymtoms(id),levels:getLevels(id)}))
        )
    }

    return (
        listAllCertificate(info.patient)
    )
}

export const AllMedicalCertificate = ({address:address, ids:ids, patientAddress: patientAddress}:CertificatesInfo) => {
    const {
        isMetaMaskInstalled,
        provider,
        accounts,
        web3,
        enable,
        disable
    } = React.useContext(userWallet);

    const {contract,connectContract,disconnectContract,logcontract} = Web3function({web3:web3,accounts:accounts,abi:abijson,address:address})
    const{contractCall} = ContractActions({contract:contract,accounts:accounts});
    const [connect,setConnect] = React.useState(false)
    React.useEffect(()=>{
        connectContract()
        setConnect(true)
    },[address])

    const [symptoms, setSymptoms] = React.useState('');
    const [levels, setLevels] = React.useState('');

    const getSymtoms = (id:string) => {
        contractCall({
            method: 'getSymptoms',
            param: [id],
            callback: (res) => {
                console.log(res)
                setSymptoms(res);
            }
        });
        return (symptoms);
    }

    const getLevels = (id:string) => {
        contractCall({
            method: 'getLevels',
            param: [id],
            callback: (res) => {
                console.log(res)
                setLevels(res);
            }
        });
        return (levels);
    }

    return(
        ids.map((id) => {return <BorderBox value={{id:id,address:patientAddress,symptoms:getSymtoms(id),levels:getLevels(id)}} onclick ={()=>{}} />})
    )
}

// export const getMedicalCertificate = (ids: ContractId[], patientAddress: string) => {
//     return ids.map((id) => (getSingleMedicalCertificate({id:id.address,patientAddress:patientAddress})))
// }