const fabric = require("../utils/fabric.js")
const { v4: uuidv4 } = require('uuid')
const { BlockDecoder } = require('fabric-common');
const { getAcademicRecordByIdMhsw } = require('./administrasiNilai.js');
const { channelName } = require("../utils/config.js");


// Ijazah
exports.createIjazah = async(user, args) => {
    const idIjazah = uuidv4()
    const network = await fabric.connectToNetwork("HE1", "ijzcontract", user)
    const result = await network.contract.submitTransaction( "CreateIjz", idIjazah, ...args)

    network.gateway.disconnect()
    return result;
}


exports.updateIjazah = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "ijzcontract", user)
    const result = await network.contract.submitTransaction( "UpdateIjz", ...args)
    network.gateway.disconnect()
    return result;
}

exports.getIjazahById = async(user, idIjazah) => {
    const network = await fabric.connectToNetwork("HE1", "ijzcontract", user)
    const result = await network.contract.evaluateTransaction( "GetIjzById", idIjazah)
    network.gateway.disconnect()

    const data =  JSON.parse(result)
    data.signatures =  await fabric.getAllSignature(data.approvalTxId)
    return data
}

exports.getIjazahByIdPt = async(user, idPt) => {
    const network = await fabric.connectToNetwork("HE1", "ijzcontract", user)
    const queryData = await network.contract.evaluateTransaction( "GetIjzByIdSp", idPt)
    network.gateway.disconnect()
    
    try {
        var allData  =  JSON.parse(queryData)
    } catch(error){
        return []
    }
    await Promise.all(allData.map( async(item, index) => {
        const signatures = await fabric.getAllSignature(item.approvalTxId)
        allData[index].signatures = signatures
    }))
    return allData
}

exports.getIjazahByIdProdi = async(user, idProdi) => {
    const network = await fabric.connectToNetwork("HE1", "ijzcontract", user)
    const queryData = await network.contract.evaluateTransaction( "GetIjzByIdSms", idProdi)
    network.gateway.disconnect()
    
    try {
        var allData  =  JSON.parse(queryData)
    } catch(error) {
        return []
    }
    await Promise.all(allData.map( async(item, index) => {
        const signatures = await fabric.getAllSignature(item.approvalTxId)
        allData[index].signatures = signatures
    }))
    return allData
}

exports.getIjazahByIdMahasiswa = async(user, idMahasiswa) => {
    const network = await fabric.connectToNetwork("HE1", "ijzcontract", user)
    const queryData = await network.contract.evaluateTransaction( "GetIjzByIdPd", idMahasiswa)
    network.gateway.disconnect()
    
    try {
        var allData  =  JSON.parse(queryData)
    } catch(error){
        return []
    }
    await Promise.all(allData.map( async(item, index) => {
        const signatures = await fabric.getAllSignature(item.approvalTxId)
        allData[index].signatures = signatures
    }))
    return allData
}

exports.getAllIjazah = async(user) => {
    const network = await fabric.connectToNetwork("HE1", "ijzcontract", user)
    const queryData = await network.contract.evaluateTransaction( "GetAllIjz")
    network.gateway.disconnect()
    
    try {
        var allData  =  JSON.parse(queryData)
    } catch(error){
        return []
    }
    return allData
}

// Transkrip
exports.createTranskrip = async(user, args) => {
    const idTranskrip = uuidv4()
    const network = await fabric.connectToNetwork("HE1", "tskcontract", user)
    const result = await network.contract.submitTransaction( "CreateTsk", idTranskrip, ...args)
    console.log("CreateTranskrip",idTranskrip,)
    network.gateway.disconnect()
    return result;
}

exports.updateTranskrip = async(user, idranskrip, args) => {
    const network = await fabric.connectToNetwork("HE1", "tskcontract", user)
    const result = await network.contract.submitTransaction( "UpdateTsk", idranskrip, ...args)
    network.gateway.disconnect()
    return result;
}

exports.getAllTranskrip = async(user) => {
    const network = await fabric.connectToNetwork("HE1", "tskcontract", user)
    const queryData = await network.contract.evaluateTransaction( "GetAllTsk")
    network.gateway.disconnect()
    
    try {
        var allData  =  JSON.parse(queryData)
    } catch(error){
        return []
    }
    return allData
}

exports.getTranskripById = async(user, idTsk) => {
    const network = await fabric.connectToNetwork("HE1", "tskcontract", user)
    const result = await network.contract.evaluateTransaction( "GetTskById", idTsk)
    network.gateway.disconnect()

    const data =  await JSON.parse(result)

    const nilai = await getAcademicRecordByIdMhsw(user, data.pd.id) 
    data.nilai = nilai

    data.signatures =  await fabric.getAllSignature(data.approvalTxId)
    return data
}

exports.getTranskripByIdPt = async(user, idPt) => {
    const network = await fabric.connectToNetwork("HE1", "tskcontract", user)
    const queryData = await network.contract.evaluateTransaction( "GetTskByIdSp", idPt)
    network.gateway.disconnect()
    
    try {
        var allData  =  JSON.parse(queryData)
    } catch(error){
        return []
    }
    await Promise.all(allData.map( async(item, index) => {
        const nilai = await getAcademicRecordByIdMhsw(user, item.pd.id) 
        allData[index].nilai = nilai
        
        const signatures = await fabric.getAllSignature(item.approvalTxId)
        allData[index].signatures = signatures
    }))
    return allData
}

exports.getTranskripByIdProdi = async(user, idProdi) => {
    const network = await fabric.connectToNetwork("HE1", "tskcontract", user)
    const queryData = await network.contract.evaluateTransaction( "GetTskByIdSms", idProdi)
    network.gateway.disconnect()
    
    try {
        var allData  =  JSON.parse(queryData)
    } catch(error){
        return []
    }
    await Promise.all(allData.map( async(item, index) => {
        const nilai = await getAcademicRecordByIdMhsw(user, item.pd.id) 
        allData[index].nilai = nilai
        
        const signatures = await fabric.getAllSignature(item.approvalTxId)
        allData[index].signatures = signatures
    }))
    return allData
}

exports.getTranskripByIdMahasiswa = async(user, idTsk) => {
    const network = await fabric.connectToNetwork("HE1", "tskcontract", user)
    const queryData = await network.contract.evaluateTransaction( "GetTskByIdPd", idTsk)
    network.gateway.disconnect()
    
    try {
        var allData  =  JSON.parse(queryData)
    } catch(error){
        return []
    }
    await Promise.all(allData.map( async(item, index) => {
        const nilai = await getAcademicRecordByIdMhsw(user, item.pd.id) 
        allData[index].nilai = nilai
        
        const signatures = await fabric.getAllSignature(item.approvalTxId)
        allData[index].signatures = signatures
    }))
    return allData
}


// Sign and Verify----------------------------------------------------------
exports.setGraduated = async(user, lstMahasiswa) => {
    const network = await fabric.connectToNetwork("HE1", "pdcontract", user)
    await network.contract.submitTransaction("SetPdGraduatedBatch", lstMahasiswa)
    network.gateway.disconnect()
}

exports.approveIjazah = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "ijzcontract", user)
    const result = await network.contract.submitTransaction( "AddIjzApproval", ...args)
    network.gateway.disconnect()
    return result;
}

exports.approveTranskrip = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "tskcontract", user)
    const result = await network.contract.submitTransaction( "AddTskApproval", ...args)
    network.gateway.disconnect()
    return result;
}

exports.addApproverIjazah = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "smscontract", user)
    const result = await network.contract.submitTransaction( "UpdateSmsApproversIjz", ...args)
    network.gateway.disconnect()
    return result;
}

exports.addApproverTranskrip = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "smscontract", user)
    const result = await network.contract.submitTransaction( "UpdateSmsApproversTsk", ...args)
    network.gateway.disconnect()
    return result;
}

exports.generateIdentifier = async(user, idIjazah, idTranskrip) => {

    var network = await fabric.connectToNetwork("HE1", "ijzcontract", user)
    const ijazah = JSON.parse(await network.contract.evaluateTransaction( "GetIjzById", idIjazah))

    network = await fabric.connectToNetwork("HE1", "tskcontract", user)
    const transkrip = JSON.parse(await network.contract.evaluateTransaction( "GetTskById", idTranskrip))
  
    console.log(ijazah, transkrip)
    if (ijazah.remainingApprover == 0 && transkrip.remainingApprover == 0 ) {
        const identifier = {}

        network = await fabric.connectToNetwork("Kemdikbud", "qscc", 'admin')
        const blockIjazah = await network.contract.evaluateTransaction('GetBlockByTxID', channelName, ijazah.approvalTxId[ijazah.approvalTxId.length - 1])
        const blockTranskrip = await network.contract.evaluateTransaction('GetBlockByTxID', channelName, transkrip.approvalTxId[transkrip.approvalTxId.length - 1])

        identifier.ijazah = fabric.calculateBlockHash(BlockDecoder.decode(blockIjazah).header)
        identifier.transkrip = fabric.calculateBlockHash(BlockDecoder.decode(blockTranskrip).header)
        
        network.gateway.disconnect()
        return identifier;
    } else {
        throw "Ijazah atau transkrip belum selesai disetujui"
    }
}

exports.verify = async(identifier) => {
    try {
        // find block that block hash == identifier
        console.log(identifier)
        const network = await fabric.connectToNetwork("Kemdikbud", "qscc", 'admin')
        const blockIjazah = await network.contract.evaluateTransaction('GetBlockByHash', channelName, Buffer.from(identifier.ijazah, 'hex'))
        const blockTranskrip = await network.contract.evaluateTransaction('GetBlockByHash', channelName, Buffer.from(identifier.transkrip, 'hex'))

        // Get data from block
        const argsIjz = BlockDecoder.decode(blockIjazah).data.data[0].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args
        const idIjazah = Buffer.from(argsIjz[1]).toString()
        const argsTsk = BlockDecoder.decode(blockTranskrip).data.data[0].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args
        const idTranskrip = Buffer.from(argsTsk[1]).toString()


        console.log("ID Ijazah",idIjazah)
        //query data ijazah, transkrip, nilai
        const ijazah = await this.getIjazahById("admin", idIjazah)
        const transkrip = await this.getTranskripById("admin", idTranskrip)

        if (ijazah.pd.id  !== transkrip.pd.id){
            throw "Data ijazah dan transkrip tidak cocok"
        }

        const data = {
            "ijazah": ijazah,
            "transkrip": transkrip,
        }
    
        network.gateway.disconnect()
        result = {
            "success": true,
            "message": "Ijazah asli",
            "data": data
        }
        return result;
    } catch (error) {
        console.log("ERROR", error)
        result = {
            "success": true,
            "message": "Ijazah palsu",
        }
        return result
    }

}

