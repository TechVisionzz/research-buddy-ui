import React,{createRef,Component, Suspense} from 'react';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import {  Input, Button,DatePicker,Select,message } from 'antd';
import { Alert } from 'antd';
import { createHashHistory } from 'history'
// import { browserHistory } from 'react-router'
import { withRouter } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
import { tokenstore } from '../global/global';
import Form from "@rjsf/core";
import '../css/general.css';
import GooglePicker from 'react-google-picker';
import {getworkspaces,doLogout,createCitations,getTags,getContributors,getPublishers,getDefaultWorkspaceId} from './CommonHelper';
import '../css/citation.css';

import { version } from 'typescript';
var myself,myform;
var fileId,iconUrl,downloadUrl;

class Citation extends React.Component {
  constructor(props) {
    super(props);
myself=this;
myform=createRef();
    // State of your application
    this.state = {
      modifiedData: {
        title: '',
        type: '',
        edition: '',
        publicationdate: '',
        doi: '',
        identifier: '',
        contributors: '',
        publishers: '',
        workspaces: '',
      },
      workspacessName: [],
      workspacessId: [],
      tagName: [],
      tagId: [],
      contributorssName:[],
      contributorssId:[],
      publisherssName:[],
      publisherssId:[],
      error: null,
      getDefaultWorkspaceId:'',
      fileName:''
    };



  }
//fetch workspaces from db
async getWorkspaces()
{
      await getworkspaces().then((response) => {
        if (response && response.data) {
            this.setState({workspacessName: response.data.map(item=>item.name) });
            this.setState({workspacessId: response.data.map(item=>item.id.toString())});
        }
    },
    )
    .catch(async (error) => {
        console.log(error);
        await doLogout();
    });
}  
//GetTags from db
async getTags(){
        await getTags().then((response) => {
          if (response && response.data) {
              this.setState({tagName: response.data.map(item=>item.name) });
              this.setState({tagId: response.data.map(item=>item.id.toString())});
          }
      },
      )
      .catch(async (error) => {
          console.log(error);
          await doLogout();
      });
}
//fetch contributors from strapi db
async getConttibutors()
{
  await getContributors().then(async(response) => {
    if (response && response.data) {
      await  this.setState({contributorssName: response.data.map(item=>item.firstname)});
      await  this.setState({contributorssId: response.data.map(item=>item.id.toString())});
    }
},
)
.catch(async (error) => {
    console.log(error);
    await doLogout();
});
}
//fetch publishers from strapi db
async getPublishers()
{
  await getPublishers().then(async(response) => {
    if (response && response.data) {
      await  this.setState({publisherssName: response.data.map(item=>item.name)});
      await  this.setState({publisherssId: response.data.map(item=>item.id.toString())});
    }
},
)
.catch(async (error) => {
    console.log(error);
    await doLogout();
});
}
  componentDidMount = async () => {
    this.getWorkspaces();
    this.getTags();
    this.getConttibutors();
    this.getPublishers();
  };
   onSubmit = async({formData}, e) => 
   {
     console.log(formData);
     if(!formData.workspace)
     {
      await getDefaultWorkspaceId().then(async(response) => {
        if (response && response.data) {
          console.log(response.data);
         await this.setState({getDefaultWorkspaceId:response.data.map((item)=>item.id)});
         console.log(this.state.getDefaultWorkspaceId);
          formData.workspace=this.state.getDefaultWorkspaceId;
      console.log(formData.workspace);
        }
    },
    )
    .catch(async (error) => {
        console.log(error);
        await doLogout();
    });
     }
    //  var a=document.getElementById('root__anyof_select').value;
     var a=0;
     if(a==0){ a="Bill";}
     if(a==1){ a="Book";}
     if(a==2){ a="Book Section";}
     if(a==3){ a="Case";}
     if(a==4){ a="Computer Program";}
     if(a==5){ a="Conference Proceedings";}
     if(a==6){ a="Encyclopedia Article";}
     if(a==7){ a="Film";}
     if(a==8){ a="Hearing";}
     if(a==9){ a="Journal Article";}
     if(a==10){ a="Magazine Article";}
     if(a==11){ a="Newspaper Article";}
     if(a==12){ a="Patent";}
     if(a==13){ a="Report";}
     if(a==14){ a="Statute";}
     if(a==15){ a="Television Broadcast";}
     if(a==16){ a="Thesis";}
     if(a==17){ a="Unspecified";}
     if(a==18){ a="Web Page";}
     if(a==19){ a="Working Paper";}
    // this is attach /dashboard  to current url
    // const history = createHashHistory();
     var citation={
      fileId:fileId,
      iconUrl:iconUrl,
      downloadUrl:downloadUrl,
      identifier:formData.identifiers,
      title:formData.title,
      type:a,
      contributors:formData.author,
      year:formData.year,
      codepages:formData.codepages,
      city:formData.city,
      legislativeBody:formData.legislativeBody,
      code:formData.code,
      month:formData.month,
      day:formData.day,
      abstract:formData.abstract,

      pages:formData.pages,
      volume:formData.volume,
      edition:formData.edition,
      editors:formData.editors,
      publishers:formData.publisher,

      book:formData.book,
      chapter:formData.chapter,

      version:formData.version,
      proctitle:formData.proctitle,
      encyclopedia:formData.encyclopedia,
      distributor:formData.distributor,
      country:formData.country,
      journal:formData.journal,
      publication:formData.publication,
      issue:formData.issue,
      issuer:formData.issuer,
      institution:formData.institution,
      number:formData.number,
      assignee:formData.assignee,
      source:formData.source,
      statutenumber:formData.statutenumber,
      department:formData.department,
      thesistype:formData.thesistype,
      typeofwork:formData.typeofwork,
      series:formData.series,
      workspaces:formData.workspace,
      tags:formData.tags,
    }
    console.log(citation);
    createCitations(citation).then(async (response) => {
      if (response && response.data) {
        const { t } = this.props;
        message.success(t('addSuccessMessage'));
        this.getWorkspaces();
        this.getTags();
        this.getConttibutors();
        this.getPublishers();
      }
  }).catch(async (error) => {
      console.log(error);
  });
   };
   onError = (errors) => console.log("I have", errors.length, "errors to fix");
  render() {

        //this is set for translation
        const { t } = this.props;
//declare properties for common use in multiple properties
  var header={
    "title": {
      "type": "string",
      "title": t('citation.title')
    },
    "year": {
      "type": "string",
      "title": t('citation.year')
    },
    "codepages": {
      "type": "number",
      "title": t('citation.codePages')
    }
};
var common={
  "pages": {
    "type": "string",
    "title": t('citation.pages')
  },
"author": {
"type": "array",
"title": t('citation.author'),
"items": {
"type": "string",
"enum":this.state.contributorssId,
"enumNames":this.state.contributorssName
},
"uniqueItems": true
},
"publisher": {
  "type": "array",
"title": t('citation.publisher'),
"items": {
  "type": "string",
  "enum":this.state.publisherssId,
  "enumNames": this.state.publisherssName
},
"uniqueItems": true
},
"code": {
  "type": "string",
  "title": t('citation.code')
},
"city": {
  "type": "string",
  "title": t('citation.city')
},
"volume": {
  "type": "string",
  "title": t('citation.volume')
},
"edition": {
  "type": "string",
  "title": t('citation.edition')
},
"editors": {
  "type": "string",
  "title": t('citation.editors')
},
"country": {
  "type": "string",
  "title": t('citation.country')
},
"publication": {
  "type": "string",
  "title": t('citation.publication')
},
"institution": {
  "type": "string",
  "title": t('citation.institution')
},
"distributor": {
  "type": "string",
  "title": t('citation.distributor')
},
"number": {
  "type": "string",
  "title": t('citation.number')
}
};
var footer={
  "month": {
    "type": "string",
    "title": t('citation.month')
  },
  "day": {
    "type": "string",
    "title": t('citation.day')
  },
  "abstract": {
    "type": "string",
    "title": t('citation.abstract')
  }

};
//end properties
  var  title=header.title;
  var  year=header.year;
  var  codepages=header.codepages;
  var  pages=common.pages;
  var  author=common.author;
  var  code=common.code;
  var  city=common.city;
  var  volume=common.volume;
  var  publisher=common.publisher;
  var  edition=common.edition;
  var  editors=common.editors;
  var  country=common.country;
  var  publication=common.publication;
  var  institution=common.institution;
  var  distributor=common.distributor;
  var  number=common.number;
  var  month=footer.month;
  var  day=footer.day;
  var  abstract=footer.abstract;
 var   schema ={
      "type": "object",
      "required": [
        // "title"
      ],
      "anyOf": [//Bill
        {
          "title": t('citation.bill'),
          "properties": {
            title,author,
            year,
            codepages,
            city,
            "legislativeBody": {
              "type": "string",
              "title": t('citation.legislativeBody')
            },
            code,
            month,day,abstract
          }
          
        },//Book
        {
          "title": t('citation.book'),
          "properties": {
            title,
           author,year,
            pages,
            volume,
            edition,
            editors,
            city,
            publisher,month,day,abstract
          }
        },//Book Section
        {
          "title": t('citation.bookSection'),
          "properties": {
            title,
           author,
            year,
            pages,
            "book": {
              "type": "string",
              "title": t('citation.bookName')
            },
            volume,
            edition,
            editors,
            city,
            publisher,
            "chapter": {
              "type": "string",
              "title": t('citation.chapter')
            },month,day,abstract
          }
        },//Case
        {
          "title": t('citation.case'),
          "properties": {
            title,
           author,year,
            pages,
            volume,month,day,abstract
          }
        },//Computer Program
        {
          "title": t('citation.computerProgram'),
          "properties": {
            title,
           author,year,
            pages,
            city,
            publisher,
            "version": {
              "type": "string",
              "title": t('citation.version')
            },month,day,abstract
          }
        },//Conference Proceedings
        {
          "title": t('citation.conferenceProceedings'),
          "properties": {
            title,
           author,
            "proctitle": {
              "type": "string",
              "title": t('citation.procTitle')
            },year,
            pages,
            editors,
            city,
            publisher,month,day,abstract
          }
        },//Encyclopedia Article
        {
          "title": t('citation.encyclopediaArticle'),
          "properties": {
            title,
           author,
            "encyclopedia": {
              "type": "string",
              "title": t('citation.encyclopedia')
            },year,
            pages,
            volume,
            edition,
            editors,
            city,
            publisher,month,day,abstract
          }
        },//Film
        {
          "title": t('citation.film'),
          "properties": {
            title,
           author,year,
            pages,
            distributor,
            country,month,day,abstract
          }
        },//Hearing
        {
          "title": t('citation.hearing'),
          "properties": {
            title,
           author,year,
            pages,
            city,
            publisher,month,day,abstract
          }
        },//Journal Article
        {
          "title": t('citation.journalArticle'),
          "properties": {
            title,
           author,
            "journal": {
              "type": "string",
              "title": t('citation.journal')
            },year,
            pages,
            volume,
            "issue": {
              "type": "string",
              "title": t('citation.issue')
            },month,day,abstract
          }
        },//Magazine Article
        {
          "title": t('citation.magazineArticle'),
          "properties": {
            title,
           author,
            publication,year,
            pages,
            city,month,day,abstract
          }
        },//Newspaper Article
        {
          "title": t('citation.newspaperArticle'),
          "properties": {
            title,
           author,
            publication,year,
            pages,
            city,month,day,abstract
          }
        },//Patent
        {
          "title": t('citation.patent'),
          "properties": {
            title,
           author,year,
            pages,
            "issuer": {
              "type": "string",
              "title": t('citation.issuer')
            },
            institution,
            country,
            number,
            "assignee": {
              "type": "string",
              "title": t('citation.assignee')
            },month,day,abstract
          }
        },//Report
        {
          "title": t('citation.report'),
          "properties": {
            title,
           author,year,
            pages,
            city,
            institution,month,day,abstract
          }
        },//Statute
        {
          "title": t('citation.statute'),
          "properties": {
            title,
           author,
             publication,year,
            pages,
            "source": {
              "type": "string",
              "title": t('citation.source')
            },
            country,
            "statutenumber": {
              "type": "string",
              "title": t('citation.statuteNumber')
            },
            code,month,day,abstract
          }
        },//Television Broadcast
        {
          "title": t('citation.televisionBroadcast'),
          "properties": {
            title,
           author,year,
            pages,
            distributor,
            country,month,day,abstract
          }
        },//Thesis
        {
          "title": t('citation.thesis'),
          "properties": {
            title,
           author,year,
            pages,
            city,
            institution,
            "department": {
              "type": "string",
              "title": t('citation.department')
            },
            "thesistype": {
              "type": "string",
              "title": t('citation.thesisType')
            },month,day,abstract
          }
        },//Unspecified
        {
          "title": t('citation.unspecified'),
          "properties": {
            title,
           author,
            publication,year,
            pages,
            volume,
            "issue": {
              "type": "string",
              "title": t('citation.issue')
            },
            city,
            publisher,
            "typeofwork": {
              "type": "string",
              "title": t('citation.typeOfWork')
            },month,day,abstract
          }
        },//Web Page
        {
          "title": t('citation.webPage'),
          "properties": {
            title,
           author,
            publication,year,
            pages,month,day,abstract
          }
        },//Working Paper
        {
          "title": t('citation.workingPaper'),
          "properties": {
            title,
           author,year,
            pages,
            city,
            institution,
            number,
            "series": {
              "type": "string",
              "title": t('citation.series')
            },month,day,abstract
          }
        }
      ],
      "properties": {
        "workspace": {
          "title": t('citation.workspace'),
          "type": "string",
          "enum":this.state.workspacessId,
          "enumNames":this.state.workspacessName,
          "uniqueItems": true,
          "default":["Default Workspace"]
          },
        "Reference":{
          "type": "string",
          "title":t('citation.reference')
        },
        "identifiers": {
          "type": "string",
          "title": t('citation.identifiers')
        },
         "tags": {
          "type": "array",
          "title": t('citation.tags'),
          "items": {
          "type": "string",
          "enum":this.state.tagId,
          "enumNames":this.state.tagName
          },
          "uniqueItems": true
          },
          "file": {
            "type": "string",
            "title": 'Attach File',
            "default":this.state.fileName
          },
      }
    };
  var   uiSchema = {
      "ui:order": ["workspace","identifiers","file","tags","*"],
      "abstract": {"ui:widget": "textarea"},
      "file":{"ui:widget": "myCustomWidget"}
    };
    const MyCustomWidget = (props) => {
      return (
        <GooglePicker clientId={'618059557346-ug58hled8h04q7sb7rfnigsovnpvbbos.apps.googleusercontent.com'}
              developerKey={'AIzaSyC9fjw10KsfVew6un3wyNn9gVRRy4Npr48'}
              scope={['https://www.googleapis.com/auth/drive']}
              onChange={data => console.log('on change:', data)}
              onAuthFailed={data => console.log('on auth failed:', data)}
              multiselect={true}
              navHidden={true}
              authImmediate={false}
              viewId={'DOCS'}
              createPicker={ (google, oauthToken) => {
                        const googleViewId = google.picker.ViewId.DOCS;
                        const uploadView = new google.picker.DocsUploadView();
                        const docsView = new google.picker.DocsView(googleViewId)
                            .setIncludeFolders(true)
                            .setSelectFolderEnabled(true);

                const picker = new window.google.picker.PickerBuilder()
                    .addView(docsView)
        .addView(uploadView)
                    .setOAuthToken(oauthToken)
                    // .setDeveloperKey('AIzaSyC9fjw10KsfVew6un3wyNn9gVRRy4Npr48')
                    .setCallback(async(data)=>{
                      if (data.action == google.picker.Action.PICKED) {
                        console.log(data);
                                           fileId = data.docs[0].id;
                                           iconUrl = data.docs[0].iconUrl;
                                           if(data.docs[0].embedUrl){
                                            downloadUrl=data.docs[0].embedUrl;
                                           }
                                           if(data.docs[0].downloadUrl){
                                            downloadUrl=data.docs[0].downloadUrl;
                                           }
                                          await this.setState({fileName:data.docs[0].name})
                                           message.success("File Uploaded Successfully!");
                                      }
                    });
                picker.build().setVisible(true);
            }}
        >
            <span><button type="button" >Upload File </button><span className="filemargin">{
            this.state.fileName}</span></span>
            <div className="google"></div>
        </GooglePicker>
      );
    };
    const widgets = {
      myCustomWidget: MyCustomWidget
    };
    //apply ui schema in future for responsiveness and grid system
  return (
    <div>
      <Form schema={schema} widgets={widgets}  uiSchema={uiSchema}  onError={this.onError} onSubmit={this.onSubmit}/>
     
        </div>
    );
  }
 }
export default withTranslation()(Citation)


