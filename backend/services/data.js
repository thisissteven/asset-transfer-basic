
const fabric = require("../utils/fabric.js")
const { getParser } = require('../utils/converter.js')

exports.createPT = async(user, args) => {
    // Add 'pendidikan tinggi' data to blockchain
    const network = await fabric.connectToNetwork("Kemdikbud", "spcontract", user)
    await network.contract.submitTransaction("CreateSp", ...args)
    network.gateway.disconnect()
}

exports.updatePT = async(user, args) => {
    const network = await fabric.connectToNetwork("Kemdikbud", "spcontract", user)
    const result = await network.contract.submitTransaction("UpdateSp", ...args)
    network.gateway.disconnect()
    return result;
}

exports.deletePT = async(user, idPT) => {
    const network = await fabric.connectToNetwork("Kemdikbud", "spcontract", user)
    const result = await network.contract.submitTransaction("DeleteSp", idPT)
    network.gateway.disconnect()
    return result;
}

exports.getAllPT = async(user) => {
    const network = await fabric.connectToNetwork("Kemdikbud", "spcontract", user)
    const queryData = await network.contract.evaluateTransaction("GetAllSp")
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}

exports.getPTById = async(user, idPT, isAdminPt) => {
    if (isAdminPt) {
        var network = await fabric.connectToNetwork("HE1", "spcontract", user)
    } else {
        var network = await fabric.connectToNetwork("Kemdikbud", "spcontract", user)
    }
    
    const queryData = await network.contract.evaluateTransaction("GetSpById", idPT)
    network.gateway.disconnect()
    return JSON.parse(queryData)
}

//Prodi
exports.createProdi = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "smscontract", user)
    const result = await network.contract.submitTransaction("CreateSms", ...args)
    network.gateway.disconnect()
    return result;
}

exports.updateProdi = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "smscontract", user)
    const result = await network.contract.submitTransaction("UpdateSms", ...args)
    network.gateway.disconnect()
    return result;
}

exports.deleteProdi = async(user, idProdi) => {
    const network = await fabric.connectToNetwork("HE1", "smscontract", user)
    const result = await network.contract.submitTransaction("DeleteSms", idProdi)
    network.gateway.disconnect()
    return result;}

exports.getAllProdi = async(user) => {
    const network = await fabric.connectToNetwork("HE1", "smscontract", user)
    const queryData = await network.contract.evaluateTransaction("GetAllSms")

    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}

exports.getProdiByPT = async(user, idPT) => {
    const network = await fabric.connectToNetwork("HE1", "smscontract", user)
    const queryData = await network.contract.evaluateTransaction("GetSmsByIdSp", idPT)
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}

exports.getProdiById = async(user, idProdi) => {
    const network = await fabric.connectToNetwork("HE1", "smscontract", user)
    const result = await network.contract.evaluateTransaction("GetSmsById", idProdi)
    network.gateway.disconnect()
    return getParser(JSON.parse(result))
}

//dosen
exports.createDosen = async(user, args) => {
    // Add 'dosen' data to blockchain
    const network = await fabric.connectToNetwork("HE1", "ptkcontract", user)
    const result = await network.contract.submitTransaction("CreatePtk", ...args)
    network.gateway.disconnect()
    return result;
}

exports.updateDosen = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "ptkcontract", user)
    const result = await network.contract.submitTransaction("UpdatePtk", ...args)
    network.gateway.disconnect()
    return result;
}

exports.deleteDosen = async(user, idDosen) => {
    const network = await fabric.connectToNetwork("HE1", "ptkcontract", user)
    const result = await network.contract.submitTransaction("DeletePtk", idDosen)
    network.gateway.disconnect()
    return result;}

exports.getAllDosen = async(user) => {
    const network = await fabric.connectToNetwork("HE1", "ptkcontract", user)
    const queryData = await network.contract.evaluateTransaction("GetAllPtk")
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}

exports.getDosenByPT = async(user, idPT) => {
    const network = await fabric.connectToNetwork("HE1", "ptkcontract", user)
    const queryData = await network.contract.evaluateTransaction("GetPtkByIdSp", idPT)
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}

exports.getDosenByProdi = async(user, idProdi) => {
    const network = await fabric.connectToNetwork("HE1", "ptkcontract", user)
    const queryData = await network.contract.evaluateTransaction("GetPtkByIdSms", idProdi)
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}


exports.getDosenById = async(user, idDosen) => {
    const network = await fabric.connectToNetwork("HE1", "ptkcontract", user)
    const result = await network.contract.evaluateTransaction("GetPtkById", idDosen)
    network.gateway.disconnect()
    return getParser(JSON.parse(result), [false, true])
}

//mahasiswa
exports.createMahasiswa = async(user, args) => {
    // Add 'mahasiswa' data to blockchain
    const network = await fabric.connectToNetwork("HE1", "pdcontract", user)
    const result = await network.contract.submitTransaction("CreatePd", ...args)
    network.gateway.disconnect()
    return result;
}

exports.updateMahasiswa = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "pdcontract", user)
    const result = await network.contract.submitTransaction("UpdatePd", ...args)
    network.gateway.disconnect()
    return result;
}

exports.deleteMahasiswa = async(user, idMahasiswa) => {
    const network = await fabric.connectToNetwork("HE1", "pdcontract", user)
    const result = await network.contract.submitTransaction("DeletePd", idMahasiswa)
    network.gateway.disconnect()
    return result;}

exports.getAllMahasiswa = async(user) => {
    const network = await fabric.connectToNetwork("HE1", "pdcontract", user)
    const queryData = await network.contract.evaluateTransaction("GetAllPd")
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}

exports.getMahasiswaById = async(user, idMahasiswa) => {
    const network = await fabric.connectToNetwork("HE1", "pdcontract", user)
    const result = await network.contract.evaluateTransaction("GetPdById", idMahasiswa)
    network.gateway.disconnect()
    return getParser(JSON.parse(result), [false, true])
}

exports.getMahasiswaByPT = async(user, idPt) => {
    const network = await fabric.connectToNetwork("HE1", "pdcontract", user)
    const queryData = await network.contract.evaluateTransaction("GetPdByIdSp", idPt)
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}

exports.getMahasiswaByProdi = async(user, idProdi) => {
    const network = await fabric.connectToNetwork("HE1", "pdcontract", user)
    const queryData = await network.contract.evaluateTransaction("GetPdByIdSms", idProdi)
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}

//mata kuliah
exports.createMataKuliah = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "mkcontract", user)
    const result = await network.contract.submitTransaction("CreateMk", ...args)
    network.gateway.disconnect()
    return result;
}

exports.updateMataKuliah = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "mkcontract", user)
    const result = await network.contract.submitTransaction("UpdateMk", ...args)
    network.gateway.disconnect()
    return result;
}

exports.deleteMataKuliah = async(user, idMK) => {
    const network = await fabric.connectToNetwork("HE1", "mkcontract", user)
    const result = await network.contract.submitTransaction("DeleteMk", idMK)
    network.gateway.disconnect()
    return result;}

exports.getAllMataKuliah = async(user) => {
    const network = await fabric.connectToNetwork("HE1", "mkcontract", user)
    const queryData = await network.contract.evaluateTransaction("GetAllMk")
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}


exports.getMataKuliahById = async(user, idMk) => {
    const network = await fabric.connectToNetwork("HE1", "mkcontract", user)
    const result = await network.contract.evaluateTransaction("GetMkById", idMk)
    network.gateway.disconnect()
    return JSON.parse(result)
}

exports.getMataKuliahByIdPt = async(user, idPt) => {
    const network = await fabric.connectToNetwork("HE1", "mkcontract", user)
    const result = await network.contract.evaluateTransaction("GetMkByIdSp", idPt)
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}

exports.getMataKuliahByIdProdi = async(user, idProdi) => {
    const network = await fabric.connectToNetwork("HE1", "mkcontract", user)
    const queryData = await network.contract.evaluateTransaction("GetMkByIdSms", idProdi)
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}

//kelas
exports.createKelas = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "klscontract", user)
    const result = await network.contract.submitTransaction("CreateKls", ...args)
    network.gateway.disconnect()
    return result; 
}

exports.updateKelas = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "klscontract", user)
    const result = await network.contract.submitTransaction("UpdateKls", ...args)
    network.gateway.disconnect()
    return result;
}

exports.deleteKelas = async(user, idKelas) => {
    const network = await fabric.connectToNetwork("HE1", "klscontract", user)
    const result = await network.contract.submitTransaction("DeleteKls", idKelas)
    network.gateway.disconnect()
    return result;}

exports.updateDosenKelas = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "klscontract", user)
    const result = await network.contract.submitTransaction("UpdateKlsListPtk", ...args)
    network.gateway.disconnect()

}

exports.updateMahasiswaKelas = async(user, args) => {
    const network = await fabric.connectToNetwork("HE1", "klscontract", user)
    const result = await network.contract.submitTransaction("UpdateKlsListPd", ...args)
    network.gateway.disconnect()

}

exports.getAllKelas = async(user) => {
    const network = await fabric.connectToNetwork("HE1", "klscontract", user)
    const queryData = await network.contract.evaluateTransaction("GetAllKls")
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}


exports.getKelasById = async(user, idKelas) => {
    const network = await fabric.connectToNetwork("HE1", "klscontract", user)
    const result = await network.contract.evaluateTransaction("GetKlsById", idKelas)
    network.gateway.disconnect()
    return JSON.parse(result)
}

exports.getKelasByIdMk = async(user, idMk) => {
    const network = await fabric.connectToNetwork("HE1", "klscontract", user)
    const queryData = await network.contract.evaluateTransaction("GetKlsByIdMk", idMk)
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}

exports.getKelasByDosen = async(user, idDosen) => {
    const network = await fabric.connectToNetwork("HE1", "klscontract", user)
    const queryData = await network.contract.evaluateTransaction("GetKlsByIdPtk", idDosen)
    network.gateway.disconnect()
    try {
        return JSON.parse(queryData)
    } catch(error) {
        return []
    }
}

