const responseStructure = (type, data) => {
  let dataObj = {
    data,
  };
  
  switch (type) {
    case 'GET':
    dataObj = { ...dataObj, type: 'SUCCESS', extra: 'Data Retrieve Successfully.', success: true };
    break;
    case 'PUT':
    dataObj = { ...dataObj, type: 'RECORD_UPDATED_SUCCESSFULLY', extra: 'Record Updated Successfully.', success: true };
    break;
    case 'POST':
    dataObj = { ...dataObj, type: 'RECORD_CREATED_SUCCESSFULLY', extra: 'Record Created Successfully.', success: true };
    break;
    case 'DELETE':
    dataObj = { ...dataObj, type: 'RECORD_DELETED_SUCCESSFULLY', extra: 'Record Deleted Successfully.', success: true };
    break;
    case 'ERROR':
    dataObj = { extra: { error: data }, type: 'DATABASE_ERROR', success: false };
    break;
  }
  return dataObj;
};

module.exports = {
  responseStructure,
};
