import axios from "axios";
import { tokenstore } from "../global/global";
var backendBaseUrl = "http://localhost:1337";
var qs = require('qs');

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
  tokenstore.clear();
  // this.props.history.push('/');
  return true;
};
const dosignup = (data) => {
  return api.post(`${backendBaseUrl}/auth/local/register`, data);
};

const getworkspaces = () => {
  //and operator condition
  const query = qs.stringify({ _where:[{ trash: false },{user:tokenstore.userid}] });
  return api.get(
    `${backendBaseUrl}/workspaces?${query}`
  );
};
const getParentTags = () => {
  const query = qs.stringify({ _where:[{ trash: false },{user:tokenstore.userid}] });
  return api.get(
    `${backendBaseUrl}/tags?${query}`
  );
};
const createTags = (data) => {
  return api.post(
    `${backendBaseUrl}/tags`,data
  );
};
const getcitaions = () => {
  const query = qs.stringify({ _where:[{ workspaces: tokenstore.workspaceid }, { trash: false }] });
  return api.get(
    `${backendBaseUrl}/citations?${query}`
  );
};
const getCitaionsAuthorId = () => {
  return api.get(
    `${backendBaseUrl}/contributors?firstname=${tokenstore.contributorName}`
  );
};
const getCitaionsTagId = () => {
  return api.get(
    `${backendBaseUrl}/tags?name=${tokenstore.tagName}`
  );
};
const getCitaionsByAuthor = () => {
  console.log(tokenstore.contributorid);
  return api.get(
    `${backendBaseUrl}/citations?contributors=${tokenstore.contributorid}`
  );
};
const getCitaionsByTag = () => {
  // console.log(tokenstore.contributorid);
  return api.get(
    `${backendBaseUrl}/citations?tags=${tokenstore.tagId}`
  );
};
const getCitaionsByTitle = () => {
  console.log(tokenstore.title);
  const query = qs.stringify({ _where: { _or: [{ title_contains: tokenstore.title }, { identifier_contains: tokenstore.title }] } });
  return api.get(
    `${backendBaseUrl}/citations?${query}`
  );
};
const getCitaionsByIsbn = () => {
  console.log(tokenstore.Isbn);
  return api.get(
    `${backendBaseUrl}/citations?identifier=${tokenstore.Isbn}`
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
const getCitationWithoutWorkspaces = () => {
  const query = qs.stringify({ _where:[{ workspaces_null: true }, { trash: false }] });
    return api.get(
    `${backendBaseUrl}/citations?${query}`
  );
};
const editCitations = (data) => {
  return api.put(`${backendBaseUrl}/citations/${tokenstore.citationEdit}`,data);
};

const addCitationUnderWorkspace = (data) => {
  // console.log(data,tokenstore.citationEdit);
  return api.put(`${backendBaseUrl}/citations/${tokenstore.editCitationId}`,data);
};
const editWorkspace=(data)=>{
  return api.put(`${backendBaseUrl}/workspaces/${tokenstore.workspaceid}`,data);
};
const editTags=(data)=>{
  console.log(tokenstore.tagId);
  return api.put(`${backendBaseUrl}/tags/${tokenstore.tagId}`,data);
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
const getTags= () => {
  const query = qs.stringify({ _where:[{ user: tokenstore.userid }, { trash: false }] });
  return api.get(
    `${backendBaseUrl}/tags?${query}`
  );
};
const getTrashTags= () => {
  const query = qs.stringify({ _where:[{ user: tokenstore.userid }, { trash: true }] });
  return api.get(
    `${backendBaseUrl}/tags?${query}`
  );
};
const getTrashCitations= () => {
  const query = qs.stringify({ _where:[{ user: tokenstore.userid }, { trash: true }] });
  return api.get(
    `${backendBaseUrl}/citations?${query}`
  );
};
const getTrashWorkspaces= () => {
  const query = qs.stringify({ _where:[{ trash: true },{user:tokenstore.userid}] });
  return api.get(
    `${backendBaseUrl}/workspaces?${query}`
  );
};

const getTagsForEdit= () => {

  return api.get(
    `${backendBaseUrl}/tags/${tokenstore.tagId}`
  );
};
const getPublishers = () => {
  return api.get(
    `${backendBaseUrl}/publishers`
  );
};
const getDefaultWorkspaceId = () => {
  const query = qs.stringify({ _where:[{ trash: false },{user:tokenstore.userid},{name:"Default Workspace"}] });
  return api.get(
    `${backendBaseUrl}/workspaces?${query}`
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
const deleteCitations = (data) => {
  return api.put(`${backendBaseUrl}/citations/${tokenstore.citationId}`,data);
};
const deleteTags = (data) => {
  return api.put(`${backendBaseUrl}/tags/${tokenstore.tagId}`,data);
};
const deleteTagsPermanently = (id) => {
  return api.delete(`${backendBaseUrl}/tags/${id}`);
};
const deleteCitationsPermanently = (id) => {
  return api.delete(`${backendBaseUrl}/citations/${id}`);
};
const deleteWorkspacePermanently = (id) => {
  return api.delete(`${backendBaseUrl}/workspaces/${id}`);
};
const deleteWorkspace=(data)=>{
return api.put(`${backendBaseUrl}/workspaces/${tokenstore.workspaceid}`,data);
}

const getSelectedTags=()=>{
  return api.get(`${backendBaseUrl}/tags/${tokenstore.tagId}`);
  }
const getSelectedWorkspace=()=>{
  return api.get(`${backendBaseUrl}/workspaces/${tokenstore.workspaceid}`);
  }
  const getSelectedWorkspaceRestore=(id)=>{
    console.log(id);
    return api.get(`${backendBaseUrl}/workspaces/${id}`);
    }
  
const getSelectedCitation=(citationId)=>{
  return api.get(`${backendBaseUrl}/citations/${citationId}`);
}
const restoreSelectedCitation=(data)=>{
  return api.put(`${backendBaseUrl}/citations/${tokenstore.restoreCitationId}`,data);
  }
  const restoreSelectedWorkspace=(data)=>{
    console.log(tokenstore.restoreWorkspaceId);
    return api.put(`${backendBaseUrl}/workspaces/${tokenstore.restoreWorkspaceId}`,data);
    }
    const restoreSelectedTags=(data)=>{
      return api.put(`${backendBaseUrl}/tags/${tokenstore.restoreTagId}`,data);
      }
const getCitationAgainstWorkspace=()=>{
  return api.get(`${backendBaseUrl}/citations?workspaces=${tokenstore.workspaceid}`);
}
export { doLogin,restoreSelectedTags,deleteWorkspacePermanently,deleteCitationsPermanently
  ,restoreSelectedWorkspace,getSelectedWorkspaceRestore,restoreSelectedCitation,
  getCitationAgainstWorkspace,getSelectedTags,getSelectedCitation,getSelectedWorkspace,
  getTrashTags,getTrashCitations,getTrashWorkspaces,editTags,getTagsForEdit,deleteTags,
  createTags,getParentTags,addCitationUnderWorkspace,getCitationWithoutWorkspaces,
  getCitaionsByAuthor,getCitaionsByTag,getTags,getCitaionsTagId,getCitaionsAuthorId,
  getCitaionsByTitle,getCitaionsByIsbn, isLoggedIn,getPublishersByName,
  getContributorsByName,createPublisher,createContributors,deleteWorkspace,
  editWorkspace,getCitationsBiblography,getEditCitations, doLogout,getContributors,
  editCitations,dosignup,getPublishers, getworkspaces, updateworkspace, createworkspaces
  ,getcitaions,deleteCitations,createCitations,deleteTagsPermanently,getDefaultWorkspaceId };