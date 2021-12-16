import React,{createRef,Component, Suspense} from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import {Input, Button,Select,DatePicker,message} from 'antd';
import { tokenstore } from '../global/global';
import Form from "@rjsf/core";
import * as setvalue from '../js/citation';
import moment from 'moment';
import GooglePicker from 'react-google-picker';
import { doLogout,getEditCitations,getTags,getContributors,getPublishers,editCitations,getworkspaces, getcitaions } from './CommonHelper';
var myself,myform;
var fileId,iconUrl,downloadUrl;
myform=createRef();
var  t ;
var anyoffworkspace;

class CitationEdit extends React.Component {

  constructor() {
    super();
    // myform1=createRef();
    myself=this;
     t  = this.props;
    //  this.setvalue = this.setvalue.bind(this);
    // State of your application
    this.state = {
      modifiedData:[],
       workspacessName:[],
      workspacessId:[],
      defaultWorkspacess: '',
      contributorssName:[],
      contributorssId:[],
      defaultContributorss:[],
      publisherssName:[],
      publisherssId:[],
      defaultPublisherss:[],
      tagName: [],
      tagId: [],
      defaultTags: [],
      error: null,
    };
  }
  componentDidMount = async () => {
    // this.setvalue(this.state.modifiedData.type);
    // window.addEventListener('load', this.setvalue);
   await  getEditCitations().then(async (response) => {
      if (response && response.data) {
         await this.setState({modifiedData: response.data });
         console.log('edited data');
          console.log(this.state.modifiedData);
          //get default contributors
          await   this.setState({defaultContributorss:response.data.contributors.map(item=>item.id.toString())});
          console.log(this.state.defaultContributorss);
          //get default publishers
          await  this.setState({defaultPublisherss:response.data.publishers.map(item=>item.id.toString())});
           //get default workspaces
           await  this.setState({defaultWorkspacess:response.data.workspaces.map(item=>item.id.toString())});
          //  console.log(this.state.defaultWorkspacess);
           //get default tags
           await  this.setState({defaultTags:response.data.tags.map(item=>item.id.toString())});
      }
  },
  )
  .catch(async (error) => {
      console.log(error);
      await doLogout();
  });
    //fetch contributors from strapi db
    await getContributors().then(async(response) => {
      if (response && response.data) {
         await this.setState({contributorssName: response.data.map(item=>item.firstname)});
         await this.setState({contributorssId: response.data.map(item=>item.id.toString())});
         console.log(this.state.contributorssId);
      }
  },
  )
  .catch(async (error) => {
      console.log(error);
      await doLogout();
      // this.props.checkLogin();
  });
    await getworkspaces().then( async (response) => {
      if (response && response.data) {
         await this.setState({workspacessName: response.data.map(item=>item.name)});
         await this.setState({workspacessId: response.data.map(item=>item.id.toString())});
         console.log(this.state.workspacessName);
         console.log(this.state.workspacessId);
      }
  },
  )
  .catch(async (error) => {
      console.log(error);
      await doLogout();
  });
    //fetch tags from db
    await getTags().then(async(response) => {
      if (response && response.data) {
         await this.setState({tagName: response.data.map(item=>item.name) });
         await this.setState({tagId: response.data.map(item=>item.id.toString())});
      }
  },
  )
  .catch(async (error) => {
      console.log(error);
      await doLogout();
  });
  //fetch publishers from strapi db
  await getPublishers().then(async(response) => {
    if (response && response.data) {
      await this.setState({publisherssName: response.data.map(item=>item.name)});
      await this.setState({publisherssId: response.data.map(item=>item.id.toString())});
    }
},
)
.catch(async (error) => {
    console.log(error);
    await doLogout();
});
  };
  async handleSubmit ({formData}, e) {
    console.log(formData);
    //json object fetch the form value and assign it to database attribute
  var citation={
    identifier:formData.identifiers,
    title:formData.title,
    type:formData.type,
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
    workspaces:formData.workspace
  }
  console.log(citation);
   editCitations(citation).then(async (response) => {
      if (response && response.data) {
message.success(t('editSuccessMessage'));
myself.props.history.push('/dashboard');  
      }
}).catch(async (error) => {
    console.log(error);
});
};
//    setvalue=(data)=>{
//     alert(data);
//      if (document.readyState === 'complete') {
//         // The page is fully loaded
//         alert("data");
//       }
// }
  render() {

     //this is set for translation
     const { t } = this.props;
    var header={
      "title": {
        "type": "string",
        "title": t('citation.title'),
        "default":this.state.modifiedData.title
      },
      "year": {
        "type": "string",
        "title": t('citation.year'),
        "default":this.state.modifiedData.year

      },
      "codepages": {
        "type": "number",
        "title": t('citation.codePages'),
        "default":this.state.modifiedData.codepages
      }
  };
  var common={
    "identifiers": {
      "type": "string",
      "title": t('citation.identifiers'),
      "default":this.state.modifiedData.identifier

    },
    "author": {
      "type": "array",
      "title": t('citation.author'),
      "items": {
      "type": "string",
      "enum":this.state.contributorssId,
      "enumNames":this.state.contributorssName
      },
      "uniqueItems": true,
      "default":this.state.defaultContributorss
      },
      "tags": {
        "type": "array",
        "title": t('citation.tags'),
        "items": {
        "type": "string",
        "enum":this.state.tagId,
        "enumNames":this.state.tagName
        },
        "uniqueItems": true,
        "default":this.state.defaultTags
        },
      "workspace": {
        "title": t('citation.workspace'),
        "type": "string",
        "enum":this.state.workspacessId,
        "enumNames":this.state.workspacessName,
        "uniqueItems": true,
        "readOnly": true,
      "default":this.state.defaultWorkspacess
      },
    "pages": {
      "type": "string",
      "title": t('citation.pages'),
      "default":this.state.modifiedData.pages
    },
  "publisher": {
    "type": "array",
  "title": t('citation.publisher'),
  "items": {
    "type": "string",
    "enum":this.state.publisherssId,
    "enumNames": this.state.publisherssName
  },
  "uniqueItems": true,
  "default":this.state.defaultPublisherss
  },
  "code": {
    "type": "string",
    "title": t('citation.code'),
    "default":this.state.modifiedData.code
  },
  "city": {
    "type": "string",
    "title": t('citation.city'),
    "default":this.state.modifiedData.city
  },
  "volume": {
    "type": "string",
    "title": t('citation.volume'),
    "default":this.state.modifiedData.volume
  },
  "edition": {
    "type": "string",
    "title": t('citation.edition'),
    "default":this.state.modifiedData.edition
  },
  "editors": {
    "type": "string",
    "title": t('citation.editors'),
    "default":this.state.modifiedData.editors
  },
  "country": {
    "type": "string",
    "title": t('citation.country'),
    "default":this.state.modifiedData.country
  },
  "publication": {
    "type": "string",
    "title": t('citation.publication'),
    "default":this.state.modifiedData.publication
  },
  "institution": {
    "type": "string",
    "title": t('citation.institution'),
    "default":this.state.modifiedData.institution
  },
  "distributor": {
    "type": "string",
    "title": t('citation.distributor'),
    "default":this.state.modifiedData.distributor
  },
  "number": {
    "type": "string",
    "title": t('citation.number'),
    "default":this.state.modifiedData.number
  }
  };
  var footer={
    "month": {
      "type": "string",
      "title": t('citation.month'),
      "default":this.state.modifiedData.month
    },
    "day": {
      "type": "string",
      "title": t('citation.day'),
      "default":this.state.modifiedData.day
    },
    "abstract": {
      "type": "string",
      "title": t('citation.abstract'),
      "default":this.state.modifiedData.abstract
    }
  
  };
  //end properties
    // var file=common.file;
    var identifiers=common.identifiers;
    var workspace=common.workspace;
    var tags=common.tags;
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
        "anyOf": [//Bill
          {
            "title": t('citation.bill'),
            "properties": {
              title,author,identifiers,workspace,tags,
              year,
              codepages,
              city,
              "legislativeBody": {
                "type": "string",
                "title": t('citation.legislativeBody'),
                "default":this.state.modifiedData.legislativeBody
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
                "title": t('citation.bookName'),
                "default":this.state.modifiedData.book
              },
              volume,
              edition,
              editors,
              city,
              publisher,
              "chapter": {
                "type": "string",
                "title": t('citation.chapter'),
                "default":this.state.modifiedData.chapter
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
                "title":  t('citation.version'),
                "default":this.state.modifiedData.version
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
                "title": t('citation.procTitle'),
                "default":this.state.modifiedData.proctitle
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
                "title": t('citation.encyclopedia'),
                "default":this.state.modifiedData.encyclopedia
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
                "title": t('citation.journal'),
                "default":this.state.modifiedData.journal
              },year,
              pages,
              volume,
              "issue": {
                "type": "string",
                "title":  t('citation.issue'),
                "default":this.state.modifiedData.issue
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
                "title": t('citation.issuer'),
                "default":this.state.modifiedData.issuer
              },
              institution,
              country,
              number,
              "assignee": {
                "type": "string",
                "title": t('citation.assignee'),
                "default":this.state.modifiedData.assignee
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
                "title": t('citation.source'),
                "default":this.state.modifiedData.source
              },
              country,
              "statutenumber": {
                "type": "string",
                "title": t('citation.statuteNumber'),
                "default":this.state.modifiedData.statutenumber
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
                "title": t('citation.department'),
                "default":this.state.modifiedData.department
              },
              "thesistype": {
                "type": "string",
                "title": t('citation.thesisType'),
                "default":this.state.modifiedData.thesistype
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
                "title": t('citation.issue'),
                "default":this.state.modifiedData.issue
              },
              city,
              publisher,
              "typeofwork": {
                "type": "string",
                "title": t('citation.typeOfWork'),
                "default":this.state.modifiedData.typeofwork
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
                "title": t('citation.series'),
                "default":this.state.modifiedData.series
              },month,day,abstract
            }
          }
        ],
        "properties": {
          workspace,
          "Reference":{
            "type": "string",
            "title":t('citation.reference')
          },identifiers,
         tags
        //  "file": {
        //   "type": "string",
        //   "title": 'Attach File',
        //   "default":this.state.fileName
        // }
        }
      };
      var   uiSchema = {
   
        "ui:order": ["workspace","identifiers","tags","*"],
        "abstract": {
          "ui:widget": "textarea"
        },
        "workspace":{"ui:disabled": "true" },
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
                                             console.log(this.state.fileName);
                                             message.success("File Uploaded Successfully!");
                                        }
                      });
                  picker.build().setVisible(true);
              }}
          >
              <span><button type="button" >Upload File</button><span>{
              this.state.fileName}</span></span>
              <div className="google"></div>
          </GooglePicker>
        );
      };
      const widgets = {
        myCustomWidget: MyCustomWidget
      };
    return (
      <div>
      <Form schema={schema} uiSchema={uiSchema}  onSubmit={this.handleSubmit}/>
      {/* {this.setvalue(this.state.fileName)} */}
      </div>
    );
  }
 }
 export default withTranslation()(CitationEdit)



