import React,{createRef} from 'react';
import axios from 'axios';
import {  Input, Button,DatePicker,Select,message } from 'antd';
import { Alert } from 'antd';
import { tokenstore } from '../global/global';
import Form from "@rjsf/antd";
import '../css/general.css';
import {getworkspaces,doLogout,createCitations,getContributors,getPublishers} from './CommonHelper';
import '../css/citation.css';
import { version } from 'typescript';
var myself,myform;

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
      workspacess: [],
      contributorssName:[],
      contributorssId:[],
      publisherssName:[],
      publisherssId:[],
      error: null,
    };
  }
   onSubmit = ({formData}, e) => 
   {
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


    }
    console.log(citation);
    createCitations(citation).then(async (response) => {
      if (response && response.data) {
  message.success('Citation Added Successfully!');
  myself.props.history.push('/dashboard');
      }
  }).catch(async (error) => {
      console.log(error);
  });
   };
   onError = (errors) => console.log("I have", errors.length, "errors to fix");
  componentDidMount = async () => {
    await getworkspaces().then((response) => {
      if (response && response.data) {
          this.setState({workspacess: response.data });
      }
  },
  )
  .catch(async (error) => {
      console.log(error);
      await doLogout();
      // this.props.checkLogin();
  });
  //fetch contributors from strapi db
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
    // this.props.checkLogin();
});
  //fetch publishers from strapi db
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
  };
  render() {
//declare properties for common use in multiple properties
  var header={
    "title": {
      "type": "string",
      "title": "Title"
    },
    "year": {
      "type": "string",
      "title": "Year"
    },
    "codepages": {
      "type": "string",
      "title": "Code Pages"
    }
};
var common={
  "pages": {
    "type": "string",
    "title": "Pages"
  },
"author": {
"type": "array",
"title": "Author",
"items": {
"type": "string",
"enum":this.state.contributorssId,
"enumNames":this.state.contributorssName
},
"uniqueItems": true
},
"publisher": {
  "type": "array",
"title": "Publisher",
"items": {
  "type": "string",
  "enum":this.state.publisherssId,
  "enumNames": this.state.publisherssName
},
"uniqueItems": true
},
"code": {
  "type": "string",
  "title": "Code"
},
"city": {
  "type": "string",
  "title": "City"
},
"volume": {
  "type": "string",
  "title": "Volume"
},
"edition": {
  "type": "string",
  "title": "Edition"
},
"editors": {
  "type": "string",
  "title": "Editors"
},
"country": {
  "type": "string",
  "title": "Country"
},
"publication": {
  "type": "string",
  "title": "Publication"
},
"institution": {
  "type": "string",
  "title": "Institution"
},
"distributor": {
  "type": "string",
  "title": "Distributor"
},
"number": {
  "type": "string",
  "title": "Number"
}
};
var footer={
  "month": {
    "type": "string",
    "title": "Month"
  },
  "day": {
    "type": "string",
    "title": "Day"
  },
  "abstract": {
    "type": "string",
    "title": "Abstract"
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
          "title": "Bill",
          "properties": {
            title,author,
            year,
            codepages,
            city,
            "legislativeBody": {
              "type": "string",
              "title": "Legislative Body"
            },
            code,
            month,day,abstract
          }
          
        },//Book
        {
          "title": "Book",
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
          "title": "Book Section",
          "properties": {
            title,
           author,
            year,
            pages,
            "book": {
              "type": "string",
              "title": "Book Name"
            },
            volume,
            edition,
            editors,
            city,
            publisher,
            "chapter": {
              "type": "string",
              "title": "Chapter"
            },month,day,abstract
          }
        },//Case
        {
          "title": "Case",
          "properties": {
            title,
           author,year,
            pages,
            volume,month,day,abstract
          }
        },//Computer Program
        {
          "title": "Computer Program",
          "properties": {
            title,
           author,year,
            pages,
            city,
            publisher,
            "version": {
              "type": "string",
              "title": "Version"
            },month,day,abstract
          }
        },//Conference Proceedings
        {
          "title": "Conference Proceedings",
          "properties": {
            title,
           author,
            "proctitle": {
              "type": "string",
              "title": "Proc.Title"
            },year,
            pages,
            editors,
            city,
            publisher,month,day,abstract
          }
        },//Encyclopedia Article
        {
          "title": "Encyclopedia Article",
          "properties": {
            title,
           author,
            "encyclopedia": {
              "type": "string",
              "title": "Encyclopedia"
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
          "title": "Film",
          "properties": {
            title,
           author,year,
            pages,
            distributor,
            country,month,day,abstract
          }
        },//Hearing
        {
          "title": "Hearing",
          "properties": {
            title,
           author,year,
            pages,
            city,
            publisher,month,day,abstract
          }
        },//Journal Article
        {
          "title": "Journal Article",
          "properties": {
            title,
           author,
            "journal": {
              "type": "string",
              "title": "Journal"
            },year,
            pages,
            volume,
            "issue": {
              "type": "string",
              "title": "Issue"
            },month,day,abstract
          }
        },//Magazine Article
        {
          "title": "Magazine Article",
          "properties": {
            title,
           author,
            publication,year,
            pages,
            city,month,day,abstract
          }
        },//Newspaper Article
        {
          "title": "Newspaper Article",
          "properties": {
            title,
           author,
            publication,year,
            pages,
            city,month,day,abstract
          }
        },//Patent
        {
          "title": "Patent",
          "properties": {
            title,
           author,year,
            pages,
            "issuer": {
              "type": "string",
              "title": "Issuer"
            },
            institution,
            country,
            number,
            "assignee": {
              "type": "string",
              "title": "Assignee"
            },month,day,abstract
          }
        },//Report
        {
          "title": "Report",
          "properties": {
            title,
           author,year,
            pages,
            city,
            institution,month,day,abstract
          }
        },//Statute
        {
          "title": "Statute",
          "properties": {
            title,
           author,
             publication,year,
            pages,
            "source": {
              "type": "string",
              "title": "Source"
            },
            country,
            "statutenumber": {
              "type": "string",
              "title": "Statute Number"
            },
            code,month,day,abstract
          }
        },//Television Broadcast
        {
          "title": "Television Broadcast",
          "properties": {
            title,
           author,year,
            pages,
            distributor,
            country,month,day,abstract
          }
        },//Thesis
        {
          "title": "Thesis",
          "properties": {
            title,
           author,year,
            pages,
            city,
            institution,
            "department": {
              "type": "string",
              "title": "Department"
            },
            "thesistype": {
              "type": "string",
              "title": "Type"
            },month,day,abstract
          }
        },//Unspecified
        {
          "title": "Unspecified",
          "properties": {
            title,
           author,
            publication,year,
            pages,
            volume,
            "issue": {
              "type": "string",
              "title": "Issue"
            },
            city,
            publisher,
            "typeofwork": {
              "type": "string",
              "title": "Type Of Work"
            },month,day,abstract
          }
        },//Web Page
        {
          "title": "Web Page",
          "properties": {
            title,
           author,
            publication,year,
            pages,month,day,abstract
          }
        },//Working Paper
        {
          "title": "Working Paper",
          "properties": {
            title,
           author,year,
            pages,
            city,
            institution,
            number,
            "series": {
              "type": "string",
              "title": "Series"
            },month,day,abstract
          }
        }
      ],
      "properties": {
        "Reference":{
          "type": "string",
          "title":"Reference"
        },
        "identifiers": {
          "type": "string",
          "title": "Identifiers (ArXivID, DOI or PMID)",
          "default": "ali"
          
        }
      }
    };
  var   uiSchema = {
   
      "ui:order": ["identifiers","*"],
      "abstract": {
        "ui:widget": "textarea"
      }
      
    };
    //apply ui schema in future for responsiveness and grid system
    
  return (
      <Form schema={schema} uiSchema={uiSchema}  onError={this.onError} onSubmit={this.onSubmit}/>
    );
  }
 }

export default Citation


