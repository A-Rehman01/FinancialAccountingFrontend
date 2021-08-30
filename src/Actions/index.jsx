import Axios from 'axios';

const baseURL='http://localhost:5000'

export const getAllCompany = () => {
  const request = baseURL+`/api/company/`;
  return Axios.get(request)
    .then(({ data, status }) => {
      //console.log("Data", data);
      return status === 201 ? data : null;
    })
    .catch((e) => {
      console.log(request + ' error', e);
      return null;
    });
};
export const getCompanyInfo = (id) => {
  const request = baseURL+`/api/company/entery/${id}`;
  return Axios.get(request)
    .then(({ data, status }) => {
      //console.log("Data", data);
      return data;
    })
    .catch((e) => {
      console.log(request + ' error', e);
      return null;
    });
};

export const CreateCompany = (formData) => {
    const request = baseURL+`/api/company/create`;
    return Axios.post(request, formData)
      .then(({ data, status }) => {
        //console.log("Data", data);
        return status === 201 ? data : null;
      })
      .catch((e) => {
        console.log(request + ' error', e.response);
        return null;
      });
  };

  export const AddEntry = (formData,id) => {
    const request = baseURL+`/api/company/entery/${id}`;
    console.log({formData})
    return Axios.post(request, formData)
      .then(({ data, status }) => {
        //console.log("Data", data);
        return status === 201 ? data : null;
      })
      .catch((e) => {
        console.log(request + ' error', e.response);
        return null;
      });
  };

  export const DeleteEntry = (cId,eId) => {
    const request = baseURL+`/api/company/entery/${cId}`;
    return Axios.delete(request, {enteryid:eId})
      .then(({ data, status }) => {
        //console.log("Data", data);
        return status === 200 ? data : null;
      })
      .catch((e) => {
        console.log(request + ' error', e.response);
        return null;
      });
  };


  export const EditEntry = (cId,formData) => {
    const request = baseURL+`/api/company/entery/${cId}`;
    return Axios.put(request, formData)
      .then(({ data, status }) => {
        //console.log("Data", data);
        return status === 201 ? data : null;
      })
      .catch((e) => {
        console.log(request + ' error', e.response);
        return null;
      });
  };

