/**
 * departmentsController.js
 * @description : exports action methods for departments.
 */

const Departments = require('../../model/departments');
const departmentsSchemaKey = require('../../utils/validation/departmentsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Departments in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Departments. {status, message, data}
 */ 
const addDepartments = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      departmentsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Departments(dataToCreate);
    let createdDepartments = await dbService.createDocument(Departments,dataToCreate);
    return res.success({ data : createdDepartments });
  } catch (error) {
    if (error.name === 'ValidationError'){
      return res.validationError({ message : `Invalid Data, Validation Failed at ${ error.message}` });
    }
    if (error.code && error.code === 11000){
      return res.validationError({ message : 'Data duplication found.' });
    }
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : find all documents of Departments from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Departments(s). {status, message, data}
 */
const findAllDepartments = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      departmentsSchemaKey.findFilterKeys,
      Departments.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.countDocument(Departments, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundDepartmentss = await dbService.getAllDocuments( Departments,query,options);
    if (!foundDepartmentss || !foundDepartmentss.data || !foundDepartmentss.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundDepartmentss });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Departments.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getDepartmentsCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      departmentsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedDepartments = await dbService.countDocument(Departments,where);
    countedDepartments = { totalRecords: countedDepartments };
    return res.success({ data : countedDepartments });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate multiple documents of Departments from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Departments.
 * @return {Object} : number of deactivated documents of Departments. {status, message, data}
 */
const softDeleteManyDepartments = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedDepartments = await dbService.bulkUpdate(Departments,query, updateBody);
    if (!updatedDepartments) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedDepartments });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Departments in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Departmentss. {status, message, data}
 */
const bulkInsertDepartments = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdDepartmentss = await dbService.bulkInsert(Departments,dataToCreate);
    return res.success({ data :createdDepartmentss });
  } catch (error){
    if (error.name === 'ValidationError'){
      return res.validationError({ message : `Invalid Data, Validation Failed at ${ error.message}` });
    }
    else if (error.code && error.code === 11000){
      return res.validationError({ message : 'Data duplication found.' });
    }
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Departments with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Departmentss.
 * @return {Object} : updated Departmentss. {status, message, data}
 */
const bulkUpdateDepartments = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = { ...req.body.data };
    delete dataToUpdate['addedBy'];
    if (typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...dataToUpdate,
        updatedBy : req.user.id
      };
    }
    let result = await dbService.bulkUpdate(Departments,filter,dataToUpdate);
    if (!result){
      return res.recordNotFound();
    }
    return res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Departments in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyDepartments = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedDepartments = await dbService.deleteMany(Departments,query);
    if (!deletedDepartments){
      return res.recordNotFound();
    }
    return res.success({ data :deletedDepartments });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate document of Departments from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Departments.
 * @return {Object} : deactivated Departments. {status, message, data}
 */
const softDeleteDepartments = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest();
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedDepartments = await dbService.findOneAndUpdateDocument(Departments, query, updateBody,{ new:true });
    if (!updatedDepartments){
      return res.recordNotFound();
    }
    return res.success({ data:updatedDepartments });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Departments with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Departments.
 * @return {obj} : updated Departments. {status, message, data}
 */
const partialUpdateDepartments = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest();
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      departmentsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedDepartments = await dbService.findOneAndUpdateDocument(Departments, query, dataToUpdate,{ new:true });
    if (!updatedDepartments) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedDepartments });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Departments with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Departments.
 * @return {Object} : updated Departments. {status, message, data}
 */
const updateDepartments = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      departmentsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedDepartments = await dbService.findOneAndUpdateDocument(Departments,query,dataToUpdate,{ new:true });
    if (!updatedDepartments){
      return res.recordNotFound();
    }
    return res.success({ data :updatedDepartments });
  } catch (error){
    if (error.name === 'ValidationError'){
      return res.validationError({ message : `Invalid Data, Validation Failed at ${ error.message}` });
    }
    else if (error.code && error.code === 11000){
      return res.validationError({ message : 'Data duplication found.' });
    }
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Departments from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Departments. {status, message, data}
 */
const getDepartments = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundDepartments = await dbService.getSingleDocument(Departments,query, options);
    if (!foundDepartments){
      return res.recordNotFound();
    }
    return res.success({ data :foundDepartments });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : delete document of Departments from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Departments. {status, message, data}
 */
const deleteDepartments = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest();
    }
    const query = { _id:req.params.id };
    const deletedDepartments = await dbService.findOneAndDeleteDocument(Departments, query);
    if (!deletedDepartments){
      return res.recordNotFound();
    }
    return res.success({ data :deletedDepartments });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};

module.exports = {
  addDepartments,
  findAllDepartments,
  getDepartmentsCount,
  softDeleteManyDepartments,
  bulkInsertDepartments,
  bulkUpdateDepartments,
  deleteManyDepartments,
  softDeleteDepartments,
  partialUpdateDepartments,
  updateDepartments,
  getDepartments,
  deleteDepartments,
};