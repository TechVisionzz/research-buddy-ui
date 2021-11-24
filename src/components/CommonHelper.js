import axios from "axios";
import { tokenstore } from "../global/global";
var backendBaseUrl = "http://localhost:1337";

let config = {
  api: {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "",
    },
  },
};

export const api = axios.create({ ...config.api });

api.interceptors.request.use(
  async (conf) => {

    if (tokenstore.jwt_token) {
      conf.headers.Authorization = 'Bearer '+tokenstore.jwt_token;
    }
    return conf;
  },
  (err) => {
    console.log("error in getting ", err);
  }
);

api.interceptors.response.use((response) => {
  // console.log('response '+response);

  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 403) {
    await doLogout();
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

const doLogin = async (email, pass) => {
  var a= await  getToken(email, pass);
  console.log(a);
}

const isLoggedIn = () => {
  return tokenstore.jwt_token ? true : false;
};


const getToken = async (email, pass) => {
  var result = false;
  var reqData = { "identifier": email, "password": pass };
  await api.request({
    method: 'post',
    url: backendBaseUrl+"/auth/local",
    data: (reqData),
    headers: {
      "Content-Type": "application/json",
    }
  }).then((response) => {
      console.log(response);
    if (response.data != null) {
      tokenstore.jwt_token = response.data.jwt;
      tokenstore.useremail = email;
      tokenstore.userid=response.data.user.id;
      result=true;
      
    }
  }).catch((error) => {
    console.log(error);
    result = false;
  tokenstore.errormessage="Username or password is incorrect!";
  console.log(error);
  });
  return result;
}


const doLogout = async () => {
//   sessionStorage.clear();
  tokenstore.clear();
  return true;
};
const dosignup = (data) => {
  return api.post(`${backendBaseUrl}/auth/local/register`, data);
};

const getworkspaces = () => {
  return api.get(
    `${backendBaseUrl}/workspaces?user=${tokenstore.userid}`
  );
};
// const getcitationsonclick = (id) => {
//   // alert('id= '+id);
//   return api.get(
//     `${backendBaseUrl}/citations?workspaces=${id}`
//   );
// };
const getcitaions = () => {
  console.log(tokenstore.workspaceid);
  return api.get(
    `${backendBaseUrl}/citations?workspaces=${tokenstore.workspaceid}`
  );
};
const getEditCitations = () => {
  // console.log(`this is from common helper ${tokenstore.citationEdit}`);
  return api.get(
    `${backendBaseUrl}/citations/${tokenstore.citationEdit}`
  );
};
const getCitationsBiblography = () => {
  return api.get(
    `${backendBaseUrl}/citations/${tokenstore.exportCitation}`
  );
};
const editCitations = (data) => {
  // console.log(data,tokenstore.citationEdit);
  return api.put(`${backendBaseUrl}/citations/${tokenstore.citationEdit}`,data);
};
const editWorkspace=(data)=>{
  return api.put(`${backendBaseUrl}/workspaces/${tokenstore.workspaceid}`,data);
};
const getContributorsByName = (firstname,lastname) => {
  return api.get(`${backendBaseUrl}/contributors?firstname=${firstname}&&lastname=${lastname}`);
};
const getPublishersByName = (name) => {
  // console.log(name);
  return api.get(`${backendBaseUrl}/publishers?name=${name}`);
};
const getContributors = () => {
  return api.get(
    `${backendBaseUrl}/contributors`
  );
};
const getPublishers = () => {
  return api.get(
    `${backendBaseUrl}/publishers`
  );
};
const updateworkspace = (data) => {
  return api.post(`${backendBaseUrl}/workspaces/update`, data);
};

const createworkspaces = (data) => {
  return api.post(`${backendBaseUrl}/workspaces`, data);
};
const createPublisher = (data) => {
  return api.post(`${backendBaseUrl}/publishers`, data);
};
const createContributors = (data) => {
  return api.post(`${backendBaseUrl}/contributors`, data);
};
const createCitations = (data) => {
  // console.log("createCitations"+data);
  return api.post(`${backendBaseUrl}/citations`, data);
};
const deleteCitations = (citationid) => {
  return api.delete(`${backendBaseUrl}/citations/${citationid}`);
};
const deleteWorkspace=()=>{
return api.delete(`${backendBaseUrl}/workspaces/${tokenstore.workspaceid}`);
}
// const search = (host: any, data: any) => {
//   return api.post(`http://${host}/search`, data);
// };



export { doLogin, isLoggedIn,getPublishersByName,getContributorsByName,createPublisher,createContributors,deleteWorkspace,editWorkspace,getCitationsBiblography,getEditCitations, doLogout,getContributors,editCitations,dosignup,getPublishers, getworkspaces, updateworkspace, createworkspaces,getcitaions,deleteCitations,createCitations };