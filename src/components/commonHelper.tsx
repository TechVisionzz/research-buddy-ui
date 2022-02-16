import Strapi from "strapi-sdk-js";
import { GlobalVars } from "../global/global";
var qs = require("qs");
const strapi = new Strapi({
  url: process.env.STRAPI_URL || "http://localhost:1337",
});
const signUp = async (values: any) => {
  await strapi.register({
    email: values.email,
    username: values.username,
    password: values.password,
  });
};
const logIn = async (values: any) => {
  return await strapi.login({
    identifier: values.username,
    password: values.password,
  });
};
const isLoggedIn = () => {
  return strapi.user ? true : false;
};
const logOut = () => {
  return strapi.logout();
};
const createCollection = async (values: any) => {
  return await strapi.create("collections", {
    name: values.name,
    description: values.description,
    parent: values.parent,
    owner: strapi.user!.id,
  });
};
const createReference = async (values: any, author: any) => {
  return await strapi.create("references", {
    volume: values.volume,
    year: values.year,
    city: values.city,
    code: values.code,
    pages: values.from + "-" + values.to,
    edition: values.edition,
    editors: values.editors, //array
    publisher: values.publisher,
    distributor: values.distributor,
    country: values.country,
    publication: values.publication,
    institution: values.institution,
    number: values.number,
    issue: values.issue,
    identifiers: values.identifiers,
    referenceType: values.referenceType,
    title: values.title,
    authors: author, //array
    codePages: values.codePagesFrom + "-" + values.codePagesTo,
    legislativeBody: values.legislativeBody,
    book: values.book,
    chapter: values.chapter,
    version: values.version,
    procTitle: values.procTitle,
    encyclopedia: values.encyclopedia,
    journal: values.journal,
    issuer: values.issuer,
    assignee: values.assignee,
    source: values.source,
    statuteNumber: values.statuteNumber,
    department: values.department,
    type: values.type,
    typeOfwork: values.typeOfwork,
    series: values.series,
    tags: values.tags,
    //array
    month: values.month,
    day: values.day,
    abstract: values.abstract,
    owner: strapi.user!.id,
  });
};
const updateReference = async (values: any, author: any) => {
  return await strapi.update("references", GlobalVars.referenceId, {
    volume: values.volume,
    year: values.year,
    city: values.city,
    code: values.code,
    pages: values.from + "-" + values.to,
    edition: values.edition,
    editors: values.editors, //array
    publisher: values.publisher,
    distributor: values.distributor,
    country: values.country,
    publication: values.publication,
    institution: values.institution,
    number: values.number,
    issue: values.issue,
    identifiers: values.identifiers,
    referenceType: values.referenceType,
    title: values.title,
    authors: author, //array
    codePages: values.codePagesFrom + "-" + values.codePagesTo,
    legislativeBody: values.legislativeBody,
    book: values.book,
    chapter: values.chapter,
    version: values.version,
    procTitle: values.procTitle,
    encyclopedia: values.encyclopedia,
    journal: values.journal,
    issuer: values.issuer,
    assignee: values.assignee,
    source: values.source,
    statuteNumber: values.statuteNumber,
    department: values.department,
    type: values.type,
    typeOfwork: values.typeOfwork,
    series: values.series,
    tags: values.tags,
    //array
    month: values.month,
    day: values.day,
    abstract: values.abstract,
    owner: strapi.user!.id,
  });
};
const getEditReference = async () => {
  return await strapi.findOne(`references`, GlobalVars.referenceId, {
    populate: ["authors", "editors", "tags"],
  });
};
const addToCollectionCreateReference = async (
  referenceType: any,
  title: any,
  description: any,
  author: any
) => {
  return await strapi.create("references", {
    referenceType: referenceType,
    title: title,
    authors: author, //array
    abstract: description,
  });
};
const getCollections = async () => {
  const query = qs.stringify({
    filters: {
      $and: [
        {
          owner: {
            id: {
              $eq: strapi.user!.id,
            },
          },
        },
        {
          trash: {
            $eq: false,
          },
        },
      ],
    },
  });
  return await strapi.find(`collections?${query}`);
};
const getAllReferences = async () => {
  const query = qs.stringify({
    populate: "*",
    filters: {
      $and: [
        {
          owner: {
            id: {
              $eq: strapi.user!.id,
            },
          },
        },
        {
          trash: {
            $eq: false,
          },
        },
      ],
    },
  });
  return await strapi.find(`references?${query}`);
};
const getTrashReferences = async () => {
  const query = qs.stringify({
    populate: "*",
    filters: {
      $and: [
        {
          owner: {
            id: {
              $eq: strapi.user!.id,
            },
          },
        },
        {
          trash: {
            $eq: true,
          },
        },
      ],
    },
  });
  return await strapi.find(`references?${query}`);
};
const getCollectionReferences = async (id: any) => {
  const query = qs.stringify({
    populate: "*",
    filters: {
      $and: [
        {
          owner: {
            id: {
              $eq: strapi.user!.id,
            },
          },
        },
        {
          collection: {
            id: {
              $eq: id,
            },
          },
        },
        {
          trash: {
            $eq: false,
          },
        },
      ],
    },
  });
  return await strapi.find(`references?${query}`);
};
const getOneCollection = async () => {
  return await strapi.findOne("collections", GlobalVars.collectionId);
};
const editCollection = async (values: any) => {
  return await strapi.update("collections", GlobalVars.collectionId, {
    name: values.name,
    description: values.description,
    parent: values.parent,
  });
};
const setReference = async (values: any) => {
  console.log(GlobalVars.referenceId);
  return await strapi.update("references", GlobalVars.referenceId, {
    collection: values.collectionName,
  });
};
const deleteReferencePermanently = async (id: any) => {
  return await strapi.delete("references", id);
};
const deleteReferenceTemporarily = async (id: any) => {
  return await strapi.update("references", id, {
    trash: true,
  });
};
const restoreReference = async (id: any) => {
  return await strapi.update("references", id, {
    trash: false,
  });
};
const deleteCollection = async () => {
  return await strapi.update("collections", GlobalVars.collectionId, {
    trash: true,
  });
};
export {
  logOut,
  getEditReference,
  updateReference,
  restoreReference,
  deleteReferenceTemporarily,
  deleteReferencePermanently,
  createReference,
  setReference,
  getTrashReferences,
  deleteCollection,
  editCollection,
  addToCollectionCreateReference,
  signUp,
  getAllReferences,
  getCollectionReferences,
  logIn,
  getOneCollection,
  createCollection,
  isLoggedIn,
  getCollections,
};
