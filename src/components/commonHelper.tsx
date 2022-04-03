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
  if (strapi.user) {
    GlobalVars.userName = strapi.user!.username;
  }
  return strapi.user ? true : false;
  // return true;
};
const logOut = () => {
  return strapi.logout();
};
const createCollection = async (values: any) => {
  var parent;
  if (values.parent) {
    parent = values.parent;
  }
  return await strapi.create("collections", {
    name: values.name,
    description: values.description,
    parent: parent,
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
  selectedItem: any,
  author: any
) => {
  return await strapi.create("references", {
    referenceType: selectedItem.attributes.referenceType,
    title: selectedItem.attributes.title,
    identifiers: selectedItem.attributes.identifiers,
    picture: selectedItem.attributes.picture,
    authors: author, //array
    owner: strapi.user!.id,
  });
};
const getCollectionsForDropdown = async () => {
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
        // {
        //   collections: {
        //     trash: {
        //       $eq: false,
        //     },
        //   },
        // },
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
const getCollections = async () => {
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
      // $or: [
      //   {
      //     collections: {
      //       trash: {
      //         $eq: false,
      //       },
      //     },
      //   },
      //   // {
      //   //   parent: {
      //   //     $eq: null,
      //   //   },
      //   // },
      // ],
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
const getSearchReferences = async (value: any) => {
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
      $or: [
        {
          authors: {
            name: {
              $eq: value,
            },
          },
        },
        {
          title: {
            $eq: value,
          },
        },
        {
          Identifiers: {
            $eq: value,
          },
        },
      ],
    },
  });
  return await strapi.find(`references?${query}`);
};
const getOneCollection = async () => {
  return await strapi.findOne("collections", GlobalVars.collectionId, {
    populate: "*",
  });
};
const editCollection = async (values: any) => {
  return await strapi.update("collections", GlobalVars.collectionId, {
    name: values.name,
    description: values.description,
    parent: values.parent,
    owner: strapi.user!.id,
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
  return await strapi.update(
    "collections",
    GlobalVars.collectionId,
    {
      trash: true,
    },
    {
      populate: "*",
    }
  );
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
  getSearchReferences,
  getTrashReferences,
  deleteCollection,
  editCollection,
  addToCollectionCreateReference,
  signUp,
  getAllReferences,
  getCollectionReferences,
  logIn,
  getOneCollection,
  getCollectionsForDropdown,
  createCollection,
  isLoggedIn,
  getCollections,
};
