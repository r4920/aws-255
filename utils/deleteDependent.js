/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Departments = require('../model/departments');
let Encounter = require('../model/encounter');
let Medication = require('../model/medication');
let Enterprise = require('../model/enterprise');
let Order = require('../model/order');
let Note = require('../model/note');
let Patient = require('../model/patient');
let OrderItem = require('../model/orderItem');
let Customer = require('../model/Customer');
let Plan = require('../model/Plan');
let Task = require('../model/Task');
let Chat_message = require('../model/Chat_message');
let Comment = require('../model/Comment');
let Chat_group = require('../model/Chat_group');
let ToDo = require('../model/ToDo');
let Appointment_schedule = require('../model/Appointment_schedule');
let Appointment_slot = require('../model/Appointment_slot');
let Event = require('../model/Event');
let Blog = require('../model/Blog');
let Master = require('../model/Master');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteDepartments = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Departments,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEncounter = async (filter) =>{
  try {
    let encounter = await Encounter.find(filter, { _id:1 });
    if (encounter.length){
      encounter = encounter.map((obj) => obj._id);

      const noteFilter = { '$or': [{ encounterId : { '$in' : encounter } }] };
      await dbService.deleteMany(Note,noteFilter);
      let response  = await dbService.deleteMany(Encounter,filter);
      return response;
    } else {
      return 'No encounter found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMedication = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Medication,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEnterprise = async (filter) =>{
  try {
    let enterprise = await Enterprise.find(filter, { _id:1 });
    if (enterprise.length){
      enterprise = enterprise.map((obj) => obj._id);

      const departmentsFilter = { '$or': [{ enterprises : { '$in' : enterprise } }] };
      await dbService.deleteMany(Departments,departmentsFilter);
      let response  = await dbService.deleteMany(Enterprise,filter);
      return response;
    } else {
      return 'No enterprise found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrder = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Order,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteNote = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Note,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePatient = async (filter) =>{
  try {
    let patient = await Patient.find(filter, { _id:1 });
    if (patient.length){
      patient = patient.map((obj) => obj._id);

      const orderFilter = { '$or': [{ patientId : { '$in' : patient } }] };
      await dbService.deleteMany(Order,orderFilter);
      let response  = await dbService.deleteMany(Patient,filter);
      return response;
    } else {
      return 'No patient found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrderItem = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(OrderItem,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCustomer = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Customer,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePlan = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Plan,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTask = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Task,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_message = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chat_message,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteComment = async (filter) =>{
  try {
    let comment = await Comment.find(filter, { _id:1 });
    if (comment.length){
      comment = comment.map((obj) => obj._id);

      const CommentFilter = { '$or': [{ parentItem : { '$in' : comment } }] };
      await dbService.deleteMany(Comment,CommentFilter);
      let response  = await dbService.deleteMany(Comment,filter);
      return response;
    } else {
      return 'No Comment found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_group = async (filter) =>{
  try {
    let chat_group = await Chat_group.find(filter, { _id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj._id);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat_group } }] };
      await dbService.deleteMany(Chat_message,Chat_messageFilter);
      let response  = await dbService.deleteMany(Chat_group,filter);
      return response;
    } else {
      return 'No Chat_group found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteToDo = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(ToDo,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAppointment_schedule = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Appointment_schedule,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAppointment_slot = async (filter) =>{
  try {
    let appointment_slot = await Appointment_slot.find(filter, { _id:1 });
    if (appointment_slot.length){
      appointment_slot = appointment_slot.map((obj) => obj._id);

      const Appointment_scheduleFilter = { '$or': [{ slot : { '$in' : appointment_slot } }] };
      await dbService.deleteMany(Appointment_schedule,Appointment_scheduleFilter);
      let response  = await dbService.deleteMany(Appointment_slot,filter);
      return response;
    } else {
      return 'No Appointment_slot found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEvent = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Event,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBlog = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Blog,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMaster = async (filter) =>{
  try {
    let master = await Master.find(filter, { _id:1 });
    if (master.length){
      master = master.map((obj) => obj._id);

      const MasterFilter = { '$or': [{ parentId : { '$in' : master } }] };
      await dbService.deleteMany(Master,MasterFilter);
      let response  = await dbService.deleteMany(Master,filter);
      return response;
    } else {
      return 'No Master found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const departmentsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(Departments,departmentsFilter);

      const encounterFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(Encounter,encounterFilter);

      const medicationFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(Medication,medicationFilter);

      const enterpriseFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(Enterprise,enterpriseFilter);

      const orderFilter = { '$or': [{ orderBy : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(Order,orderFilter);

      const noteFilter = { '$or': [{ provider : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(Note,noteFilter);

      const patientFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(Patient,patientFilter);

      const orderItemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(OrderItem,orderItemFilter);

      const CustomerFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(Customer,CustomerFilter);

      const PlanFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      await dbService.deleteMany(Plan,PlanFilter);

      const TaskFilter = { '$or': [{ completedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      await dbService.deleteMany(Task,TaskFilter);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const CommentFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      await dbService.deleteMany(Comment,CommentFilter);

      const Chat_groupFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      await dbService.deleteMany(Chat_group,Chat_groupFilter);

      const ToDoFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(ToDo,ToDoFilter);

      const Appointment_scheduleFilter = { '$or': [{ host : { '$in' : user } },{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      await dbService.deleteMany(Appointment_schedule,Appointment_scheduleFilter);

      const Appointment_slotFilter = { '$or': [{ userId : { '$in' : user } },{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      await dbService.deleteMany(Appointment_slot,Appointment_slotFilter);

      const EventFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      await dbService.deleteMany(Event,EventFilter);

      const BlogFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      await dbService.deleteMany(Blog,BlogFilter);

      const MasterFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      await dbService.deleteMany(Master,MasterFilter);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(User,userFilter);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      await dbService.deleteMany(UserRole,userRoleFilter);
      let response  = await dbService.deleteMany(User,filter);
      return response;
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      await dbService.deleteMany(UserRole,userRoleFilter);
      let response  = await dbService.deleteMany(Role,filter);
      return response;
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      await dbService.deleteMany(RouteRole,routeRoleFilter);
      let response  = await dbService.deleteMany(ProjectRoute,filter);
      return response;
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countDepartments = async (filter) =>{
  try {
        
    const departmentsCnt =  await Departments.countDocuments(filter);
    return { departments : departmentsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEncounter = async (filter) =>{
  try {
        
    let encounter = await Encounter.find(filter, { _id:1 });
    if (encounter.length){
      encounter = encounter.map((obj) => obj._id);

      const noteFilter = { '$or': [{ encounterId : { '$in' : encounter } }] };
      const noteCnt =  await dbService.countDocument(Note,noteFilter);

      let response = { note : noteCnt, };
      return response;
    } else {
      return {  encounter : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countMedication = async (filter) =>{
  try {
        
    const medicationCnt =  await Medication.countDocuments(filter);
    return { medication : medicationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEnterprise = async (filter) =>{
  try {
        
    let enterprise = await Enterprise.find(filter, { _id:1 });
    if (enterprise.length){
      enterprise = enterprise.map((obj) => obj._id);

      const departmentsFilter = { '$or': [{ enterprises : { '$in' : enterprise } }] };
      const departmentsCnt =  await dbService.countDocument(Departments,departmentsFilter);

      let response = { departments : departmentsCnt, };
      return response;
    } else {
      return {  enterprise : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrder = async (filter) =>{
  try {
        
    const orderCnt =  await Order.countDocuments(filter);
    return { order : orderCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countNote = async (filter) =>{
  try {
        
    const noteCnt =  await Note.countDocuments(filter);
    return { note : noteCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPatient = async (filter) =>{
  try {
        
    let patient = await Patient.find(filter, { _id:1 });
    if (patient.length){
      patient = patient.map((obj) => obj._id);

      const orderFilter = { '$or': [{ patientId : { '$in' : patient } }] };
      const orderCnt =  await dbService.countDocument(Order,orderFilter);

      let response = { order : orderCnt, };
      return response;
    } else {
      return {  patient : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrderItem = async (filter) =>{
  try {
        
    const orderItemCnt =  await OrderItem.countDocuments(filter);
    return { orderItem : orderItemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCustomer = async (filter) =>{
  try {
        
    const CustomerCnt =  await Customer.countDocuments(filter);
    return { Customer : CustomerCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPlan = async (filter) =>{
  try {
        
    const PlanCnt =  await Plan.countDocuments(filter);
    return { Plan : PlanCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTask = async (filter) =>{
  try {
        
    const TaskCnt =  await Task.countDocuments(filter);
    return { Task : TaskCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_message = async (filter) =>{
  try {
        
    const Chat_messageCnt =  await Chat_message.countDocuments(filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countComment = async (filter) =>{
  try {
        
    let comment = await Comment.find(filter, { _id:1 });
    if (comment.length){
      comment = comment.map((obj) => obj._id);

      const CommentFilter = { '$or': [{ parentItem : { '$in' : comment } }] };
      const CommentCnt =  await dbService.countDocument(Comment,CommentFilter);

      let response = { Comment : CommentCnt, };
      return response;
    } else {
      return {  comment : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_group = async (filter) =>{
  try {
        
    let chat_group = await Chat_group.find(filter, { _id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj._id);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat_group } }] };
      const Chat_messageCnt =  await dbService.countDocument(Chat_message,Chat_messageFilter);

      let response = { Chat_message : Chat_messageCnt, };
      return response;
    } else {
      return {  chat_group : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countToDo = async (filter) =>{
  try {
        
    const ToDoCnt =  await ToDo.countDocuments(filter);
    return { ToDo : ToDoCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAppointment_schedule = async (filter) =>{
  try {
        
    const Appointment_scheduleCnt =  await Appointment_schedule.countDocuments(filter);
    return { Appointment_schedule : Appointment_scheduleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAppointment_slot = async (filter) =>{
  try {
        
    let appointment_slot = await Appointment_slot.find(filter, { _id:1 });
    if (appointment_slot.length){
      appointment_slot = appointment_slot.map((obj) => obj._id);

      const Appointment_scheduleFilter = { '$or': [{ slot : { '$in' : appointment_slot } }] };
      const Appointment_scheduleCnt =  await dbService.countDocument(Appointment_schedule,Appointment_scheduleFilter);

      let response = { Appointment_schedule : Appointment_scheduleCnt, };
      return response;
    } else {
      return {  appointment_slot : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countEvent = async (filter) =>{
  try {
        
    const EventCnt =  await Event.countDocuments(filter);
    return { Event : EventCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMaster = async (filter) =>{
  try {
        
    let master = await Master.find(filter, { _id:1 });
    if (master.length){
      master = master.map((obj) => obj._id);

      const MasterFilter = { '$or': [{ parentId : { '$in' : master } }] };
      const MasterCnt =  await dbService.countDocument(Master,MasterFilter);

      let response = { Master : MasterCnt, };
      return response;
    } else {
      return {  master : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const departmentsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const departmentsCnt =  await dbService.countDocument(Departments,departmentsFilter);

      const encounterFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const encounterCnt =  await dbService.countDocument(Encounter,encounterFilter);

      const medicationFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const medicationCnt =  await dbService.countDocument(Medication,medicationFilter);

      const enterpriseFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const enterpriseCnt =  await dbService.countDocument(Enterprise,enterpriseFilter);

      const orderFilter = { '$or': [{ orderBy : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const orderCnt =  await dbService.countDocument(Order,orderFilter);

      const noteFilter = { '$or': [{ provider : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const noteCnt =  await dbService.countDocument(Note,noteFilter);

      const patientFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const patientCnt =  await dbService.countDocument(Patient,patientFilter);

      const orderItemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const orderItemCnt =  await dbService.countDocument(OrderItem,orderItemFilter);

      const CustomerFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const CustomerCnt =  await dbService.countDocument(Customer,CustomerFilter);

      const PlanFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const PlanCnt =  await dbService.countDocument(Plan,PlanFilter);

      const TaskFilter = { '$or': [{ completedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const TaskCnt =  await dbService.countDocument(Task,TaskFilter);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_messageCnt =  await dbService.countDocument(Chat_message,Chat_messageFilter);

      const CommentFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const CommentCnt =  await dbService.countDocument(Comment,CommentFilter);

      const Chat_groupFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_groupCnt =  await dbService.countDocument(Chat_group,Chat_groupFilter);

      const ToDoFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ToDoCnt =  await dbService.countDocument(ToDo,ToDoFilter);

      const Appointment_scheduleFilter = { '$or': [{ host : { '$in' : user } },{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Appointment_scheduleCnt =  await dbService.countDocument(Appointment_schedule,Appointment_scheduleFilter);

      const Appointment_slotFilter = { '$or': [{ userId : { '$in' : user } },{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Appointment_slotCnt =  await dbService.countDocument(Appointment_slot,Appointment_slotFilter);

      const EventFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const EventCnt =  await dbService.countDocument(Event,EventFilter);

      const BlogFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const MasterFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const MasterCnt =  await dbService.countDocument(Master,MasterFilter);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        departments : departmentsCnt,
        encounter : encounterCnt,
        medication : medicationCnt,
        enterprise : enterpriseCnt,
        order : orderCnt,
        note : noteCnt,
        patient : patientCnt,
        orderItem : orderItemCnt,
        Customer : CustomerCnt,
        Plan : PlanCnt,
        Task : TaskCnt,
        Chat_message : Chat_messageCnt,
        Comment : CommentCnt,
        Chat_group : Chat_groupCnt,
        ToDo : ToDoCnt,
        Appointment_schedule : Appointment_scheduleCnt,
        Appointment_slot : Appointment_slotCnt,
        Event : EventCnt,
        Blog : BlogCnt,
        Master : MasterCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDepartments = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Departments.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEncounter = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let encounter = await Encounter.find(filter, { _id:1 });
    if (encounter.length){
      encounter = encounter.map((obj) => obj._id);
      const noteFilter8319 = { 'encounterId': { '$in': encounter } };
      const note6440 = await softDeleteNote(noteFilter8319, updateBody);
      return await Encounter.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No encounter found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMedication = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Medication.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEnterprise = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let enterprise = await Enterprise.find(filter, { _id:1 });
    if (enterprise.length){
      enterprise = enterprise.map((obj) => obj._id);
      const departmentsFilter9239 = { 'enterprises': { '$in': enterprise } };
      const departments7521 = await softDeleteDepartments(departmentsFilter9239, updateBody);
      return await Enterprise.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No enterprise found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrder = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Order.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteNote = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Note.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePatient = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let patient = await Patient.find(filter, { _id:1 });
    if (patient.length){
      patient = patient.map((obj) => obj._id);
      const orderFilter6886 = { 'patientId': { '$in': patient } };
      const order8547 = await softDeleteOrder(orderFilter6886, updateBody);
      return await Patient.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No patient found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrderItem = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await OrderItem.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCustomer = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Customer.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePlan = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Plan.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTask = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Task.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_message = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Chat_message.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteComment = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let comment = await Comment.find(filter, { _id:1 });
    if (comment.length){
      comment = comment.map((obj) => obj._id);
      const CommentFilter2985 = { 'parentItem': { '$in': comment } };
      const Comment8661 = await softDeleteComment(CommentFilter2985, updateBody);
      return await Comment.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No Comment found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_group = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let chat_group = await Chat_group.find(filter, { _id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj._id);
      const Chat_messageFilter3972 = { 'groupId': { '$in': chat_group } };
      const Chat_message6595 = await softDeleteChat_message(Chat_messageFilter3972, updateBody);
      return await Chat_group.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No Chat_group found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteToDo = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await ToDo.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAppointment_schedule = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Appointment_schedule.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAppointment_slot = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let appointment_slot = await Appointment_slot.find(filter, { _id:1 });
    if (appointment_slot.length){
      appointment_slot = appointment_slot.map((obj) => obj._id);
      const Appointment_scheduleFilter1623 = { 'slot': { '$in': appointment_slot } };
      const Appointment_schedule1929 = await softDeleteAppointment_schedule(Appointment_scheduleFilter1623, updateBody);
      return await Appointment_slot.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No Appointment_slot found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEvent = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Event.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMaster = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let master = await Master.find(filter, { _id:1 });
    if (master.length){
      master = master.map((obj) => obj._id);
      const MasterFilter8689 = { 'parentId': { '$in': master } };
      const Master1495 = await softDeleteMaster(MasterFilter8689, updateBody);
      return await Master.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No Master found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const departmentsFilter3534 = { 'addedBy': { '$in': user } };
      const departments4575 = await softDeleteDepartments(departmentsFilter3534, updateBody);
      const departmentsFilter3351 = { 'updatedBy': { '$in': user } };
      const departments6156 = await softDeleteDepartments(departmentsFilter3351, updateBody);
      const encounterFilter8759 = { 'addedBy': { '$in': user } };
      const encounter7576 = await softDeleteEncounter(encounterFilter8759, updateBody);
      const encounterFilter6420 = { 'updatedBy': { '$in': user } };
      const encounter8414 = await softDeleteEncounter(encounterFilter6420, updateBody);
      const medicationFilter3467 = { 'addedBy': { '$in': user } };
      const medication6501 = await softDeleteMedication(medicationFilter3467, updateBody);
      const medicationFilter2247 = { 'updatedBy': { '$in': user } };
      const medication2957 = await softDeleteMedication(medicationFilter2247, updateBody);
      const enterpriseFilter5128 = { 'addedBy': { '$in': user } };
      const enterprise8388 = await softDeleteEnterprise(enterpriseFilter5128, updateBody);
      const enterpriseFilter7676 = { 'updatedBy': { '$in': user } };
      const enterprise1224 = await softDeleteEnterprise(enterpriseFilter7676, updateBody);
      const orderFilter8724 = { 'orderBy': { '$in': user } };
      const order8003 = await softDeleteOrder(orderFilter8724, updateBody);
      const orderFilter2380 = { 'addedBy': { '$in': user } };
      const order3182 = await softDeleteOrder(orderFilter2380, updateBody);
      const orderFilter8496 = { 'updatedBy': { '$in': user } };
      const order5013 = await softDeleteOrder(orderFilter8496, updateBody);
      const noteFilter4760 = { 'provider': { '$in': user } };
      const note9265 = await softDeleteNote(noteFilter4760, updateBody);
      const noteFilter9918 = { 'addedBy': { '$in': user } };
      const note0547 = await softDeleteNote(noteFilter9918, updateBody);
      const noteFilter8708 = { 'updatedBy': { '$in': user } };
      const note4978 = await softDeleteNote(noteFilter8708, updateBody);
      const patientFilter5399 = { 'addedBy': { '$in': user } };
      const patient7445 = await softDeletePatient(patientFilter5399, updateBody);
      const patientFilter6381 = { 'updatedBy': { '$in': user } };
      const patient8980 = await softDeletePatient(patientFilter6381, updateBody);
      const orderItemFilter6608 = { 'addedBy': { '$in': user } };
      const orderItem6668 = await softDeleteOrderItem(orderItemFilter6608, updateBody);
      const orderItemFilter6267 = { 'updatedBy': { '$in': user } };
      const orderItem8459 = await softDeleteOrderItem(orderItemFilter6267, updateBody);
      const CustomerFilter3674 = { 'addedBy': { '$in': user } };
      const Customer6808 = await softDeleteCustomer(CustomerFilter3674, updateBody);
      const CustomerFilter5648 = { 'updatedBy': { '$in': user } };
      const Customer7703 = await softDeleteCustomer(CustomerFilter5648, updateBody);
      const PlanFilter7689 = { 'updatedBy': { '$in': user } };
      const Plan4069 = await softDeletePlan(PlanFilter7689, updateBody);
      const PlanFilter8356 = { 'addedBy': { '$in': user } };
      const Plan5087 = await softDeletePlan(PlanFilter8356, updateBody);
      const TaskFilter0033 = { 'completedBy': { '$in': user } };
      const Task9648 = await softDeleteTask(TaskFilter0033, updateBody);
      const TaskFilter8868 = { 'updatedBy': { '$in': user } };
      const Task1057 = await softDeleteTask(TaskFilter8868, updateBody);
      const TaskFilter9446 = { 'addedBy': { '$in': user } };
      const Task5283 = await softDeleteTask(TaskFilter9446, updateBody);
      const Chat_messageFilter9574 = { 'updatedBy': { '$in': user } };
      const Chat_message6746 = await softDeleteChat_message(Chat_messageFilter9574, updateBody);
      const Chat_messageFilter0455 = { 'addedBy': { '$in': user } };
      const Chat_message9420 = await softDeleteChat_message(Chat_messageFilter0455, updateBody);
      const CommentFilter9058 = { 'updatedBy': { '$in': user } };
      const Comment4253 = await softDeleteComment(CommentFilter9058, updateBody);
      const CommentFilter2644 = { 'addedBy': { '$in': user } };
      const Comment4242 = await softDeleteComment(CommentFilter2644, updateBody);
      const Chat_groupFilter0791 = { 'updatedBy': { '$in': user } };
      const Chat_group3826 = await softDeleteChat_group(Chat_groupFilter0791, updateBody);
      const Chat_groupFilter7994 = { 'addedBy': { '$in': user } };
      const Chat_group3640 = await softDeleteChat_group(Chat_groupFilter7994, updateBody);
      const ToDoFilter4706 = { 'addedBy': { '$in': user } };
      const ToDo1865 = await softDeleteToDo(ToDoFilter4706, updateBody);
      const ToDoFilter0923 = { 'updatedBy': { '$in': user } };
      const ToDo6937 = await softDeleteToDo(ToDoFilter0923, updateBody);
      const Appointment_scheduleFilter0661 = { 'host': { '$in': user } };
      const Appointment_schedule8475 = await softDeleteAppointment_schedule(Appointment_scheduleFilter0661, updateBody);
      const Appointment_scheduleFilter6187 = { 'updatedBy': { '$in': user } };
      const Appointment_schedule0856 = await softDeleteAppointment_schedule(Appointment_scheduleFilter6187, updateBody);
      const Appointment_scheduleFilter6532 = { 'addedBy': { '$in': user } };
      const Appointment_schedule6194 = await softDeleteAppointment_schedule(Appointment_scheduleFilter6532, updateBody);
      const Appointment_slotFilter8315 = { 'userId': { '$in': user } };
      const Appointment_slot8754 = await softDeleteAppointment_slot(Appointment_slotFilter8315, updateBody);
      const Appointment_slotFilter0785 = { 'updatedBy': { '$in': user } };
      const Appointment_slot3545 = await softDeleteAppointment_slot(Appointment_slotFilter0785, updateBody);
      const Appointment_slotFilter2845 = { 'addedBy': { '$in': user } };
      const Appointment_slot8566 = await softDeleteAppointment_slot(Appointment_slotFilter2845, updateBody);
      const EventFilter1479 = { 'updatedBy': { '$in': user } };
      const Event2432 = await softDeleteEvent(EventFilter1479, updateBody);
      const EventFilter7963 = { 'addedBy': { '$in': user } };
      const Event8548 = await softDeleteEvent(EventFilter7963, updateBody);
      const BlogFilter1704 = { 'updatedBy': { '$in': user } };
      const Blog2228 = await softDeleteBlog(BlogFilter1704, updateBody);
      const BlogFilter8423 = { 'addedBy': { '$in': user } };
      const Blog6136 = await softDeleteBlog(BlogFilter8423, updateBody);
      const MasterFilter2698 = { 'updatedBy': { '$in': user } };
      const Master8777 = await softDeleteMaster(MasterFilter2698, updateBody);
      const MasterFilter4999 = { 'addedBy': { '$in': user } };
      const Master9347 = await softDeleteMaster(MasterFilter4999, updateBody);
      const userFilter3624 = { 'addedBy': { '$in': user } };
      const user2873 = await softDeleteUser(userFilter3624, updateBody);
      const userFilter9176 = { 'updatedBy': { '$in': user } };
      const user6906 = await softDeleteUser(userFilter9176, updateBody);
      const userTokensFilter8278 = { 'userId': { '$in': user } };
      const userTokens2878 = await softDeleteUserTokens(userTokensFilter8278, updateBody);
      const userTokensFilter7848 = { 'addedBy': { '$in': user } };
      const userTokens2998 = await softDeleteUserTokens(userTokensFilter7848, updateBody);
      const userTokensFilter4448 = { 'updatedBy': { '$in': user } };
      const userTokens3059 = await softDeleteUserTokens(userTokensFilter4448, updateBody);
      const roleFilter1336 = { 'addedBy': { '$in': user } };
      const role1480 = await softDeleteRole(roleFilter1336, updateBody);
      const roleFilter4856 = { 'updatedBy': { '$in': user } };
      const role2062 = await softDeleteRole(roleFilter4856, updateBody);
      const projectRouteFilter0907 = { 'addedBy': { '$in': user } };
      const projectRoute1261 = await softDeleteProjectRoute(projectRouteFilter0907, updateBody);
      const projectRouteFilter9490 = { 'updatedBy': { '$in': user } };
      const projectRoute1465 = await softDeleteProjectRoute(projectRouteFilter9490, updateBody);
      const routeRoleFilter7378 = { 'addedBy': { '$in': user } };
      const routeRole8355 = await softDeleteRouteRole(routeRoleFilter7378, updateBody);
      const routeRoleFilter3435 = { 'updatedBy': { '$in': user } };
      const routeRole0652 = await softDeleteRouteRole(routeRoleFilter3435, updateBody);
      const userRoleFilter1210 = { 'userId': { '$in': user } };
      const userRole6368 = await softDeleteUserRole(userRoleFilter1210, updateBody);
      const userRoleFilter9003 = { 'addedBy': { '$in': user } };
      const userRole5568 = await softDeleteUserRole(userRoleFilter9003, updateBody);
      const userRoleFilter1481 = { 'updatedBy': { '$in': user } };
      const userRole4345 = await softDeleteUserRole(userRoleFilter1481, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter5949 = { 'roleId': { '$in': role } };
      const routeRole0325 = await softDeleteRouteRole(routeRoleFilter5949, updateBody);
      const userRoleFilter7382 = { 'roleId': { '$in': role } };
      const userRole6773 = await softDeleteUserRole(userRoleFilter7382, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter7636 = { 'routeId': { '$in': projectroute } };
      const routeRole6643 = await softDeleteRouteRole(routeRoleFilter7636, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteDepartments,
  deleteEncounter,
  deleteMedication,
  deleteEnterprise,
  deleteOrder,
  deleteNote,
  deletePatient,
  deleteOrderItem,
  deleteCustomer,
  deletePlan,
  deleteTask,
  deleteChat_message,
  deleteComment,
  deleteChat_group,
  deleteToDo,
  deleteAppointment_schedule,
  deleteAppointment_slot,
  deleteEvent,
  deleteBlog,
  deleteMaster,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countDepartments,
  countEncounter,
  countMedication,
  countEnterprise,
  countOrder,
  countNote,
  countPatient,
  countOrderItem,
  countCustomer,
  countPlan,
  countTask,
  countChat_message,
  countComment,
  countChat_group,
  countToDo,
  countAppointment_schedule,
  countAppointment_slot,
  countEvent,
  countBlog,
  countMaster,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteDepartments,
  softDeleteEncounter,
  softDeleteMedication,
  softDeleteEnterprise,
  softDeleteOrder,
  softDeleteNote,
  softDeletePatient,
  softDeleteOrderItem,
  softDeleteCustomer,
  softDeletePlan,
  softDeleteTask,
  softDeleteChat_message,
  softDeleteComment,
  softDeleteChat_group,
  softDeleteToDo,
  softDeleteAppointment_schedule,
  softDeleteAppointment_slot,
  softDeleteEvent,
  softDeleteBlog,
  softDeleteMaster,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
