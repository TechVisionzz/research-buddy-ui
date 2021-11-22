 var CHICAGO_TEMPLATE = `<?xml version="1.0" encoding="utf-8"?>
 <style xmlns="http://purl.org/net/xbiblio/csl" class="note" version="1.0" demote-non-dropping-particle="display-and-sort" page-range-format="chicago">
   <info>
     <title>Chicago Manual of Style 17th edition (note, annotated bibliography)</title>
     <id>http://www.zotero.org/styles/chicago-annotated-bibliography</id>
     <link href="http://www.zotero.org/styles/chicago-annotated-bibliography" rel="self"/>
     <link href="http://www.chicagomanualofstyle.org/tools_citationguide.html" rel="documentation"/>
     <author>
       <name>Julian Onions</name>
       <email>julian.onions@gmail.com</email>
     </author>
     <contributor>
       <name>Simon Kornblith</name>
       <email>simon@simonster.com</email>
     </contributor>
     <contributor>
       <name>Elena Razlogova</name>
       <email>elena.razlogova@gmail.com</email>
     </contributor>
     <contributor>
       <name>Frank Bennett</name>
       <email>biercenator@gmail.com</email>
     </contributor>
     <contributor>
       <name>Andrew Dunning</name>
       <email>andrew.dunning@utoronto.ca</email>
     </contributor>
     <contributor>
       <name>Sebastian Karcher</name>
     </contributor>
     <contributor>
       <name>Brenton M. Wiernik</name>
     </contributor>
     <category citation-format="note"/>
     <category field="generic-base"/>
     <summary>Chicago format with short notes and annotated bibliography</summary>
     <updated>2020-04-26T18:22:50+00:00</updated>
     <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
   </info>
   <locale xml:lang="en">
     <terms>
       <term name="editor" form="verb-short">ed.</term>
       <term name="translator" form="verb-short">trans.</term>
       <term name="translator" form="short">trans.</term>
       <term name="editortranslator" form="verb-short">ed. and trans.</term>
       <term name="editortranslator" form="verb">Edited and translated by</term>
       <term name="translator" form="short">trans.</term>
     </terms>
   </locale>
   <macro name="editor-translator">
     <group delimiter=", ">
       <group delimiter=" ">
         <choose>
           <if variable="container-author reviewed-author" match="any">
             <group>
               <names variable="container-author reviewed-author">
                 <label form="verb-short" text-case="lowercase" suffix=" "/>
                 <name and="text" delimiter=", "/>
               </names>
             </group>
           </if>
         </choose>
       </group>
       <names variable="editor translator" delimiter=", ">
         <label form="verb-short" text-case="lowercase" suffix=" "/>
         <name and="text" delimiter=", "/>
       </names>
     </group>
   </macro>
   <macro name="secondary-contributors-note">
     <choose>
       <if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="none">
         <text macro="editor-translator"/>
       </if>
     </choose>
   </macro>
   <macro name="container-contributors-note">
     <choose>
       <if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="any">
         <text macro="editor-translator"/>
       </if>
     </choose>
   </macro>
   <macro name="secondary-contributors">
     <choose>
       <if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="none">
         <names variable="editor translator" delimiter=". ">
           <label form="verb" text-case="capitalize-first" suffix=" "/>
           <name and="text" delimiter=", "/>
         </names>
       </if>
     </choose>
   </macro>
   <macro name="container-contributors">
     <choose>
       <if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="any">
         <group delimiter=", ">
           <choose>
             <if variable="author">
               <choose>
                 <if variable="container-author" match="any">
                   <names variable="container-author">
                     <label form="verb-short" text-case="lowercase" suffix=" "/>
                     <name and="text" delimiter=", "/>
                   </names>
                 </if>
               </choose>
               <!--This includes page numers after the container author, e.g. for Introductions -->
               <choose>
                 <if variable="container-author author" match="all">
                   <group delimiter=". ">
                     <text variable="page"/>
                     <names variable="editor translator" delimiter=", ">
                       <label form="verb" suffix=" "/>
                       <name and="text" delimiter=", "/>
                     </names>
                   </group>
                 </if>
                 <else>
                   <names variable="editor translator" delimiter=", ">
                     <label form="verb" text-case="lowercase" suffix=" "/>
                     <name and="text" delimiter=", "/>
                   </names>
                 </else>
               </choose>
             </if>
           </choose>
         </group>
       </if>
     </choose>
   </macro>
   <macro name="recipient-note">
     <names variable="recipient" delimiter=", ">
       <label form="verb" text-case="lowercase" suffix=" "/>
       <name and="text" delimiter=", "/>
     </names>
   </macro>
   <macro name="contributors-note">
     <group delimiter=" ">
       <names variable="author">
         <name and="text" sort-separator=", " delimiter=", "/>
         <label form="short" prefix=", "/>
         <substitute>
           <names variable="editor"/>
           <names variable="translator"/>
         </substitute>
       </names>
       <text macro="recipient-note"/>
     </group>
   </macro>
   <macro name="editor">
     <names variable="editor">
       <name name-as-sort-order="first" and="text" sort-separator=", " delimiter=", " delimiter-precedes-last="always"/>
       <label form="short" prefix=", "/>
     </names>
   </macro>
   <macro name="translator">
     <names variable="translator">
       <name name-as-sort-order="first" and="text" sort-separator=", " delimiter=", " delimiter-precedes-last="always"/>
       <label form="verb-short" prefix=", "/>
     </names>
   </macro>
   <macro name="recipient">
     <group delimiter=" ">
       <choose>
         <if type="personal_communication">
           <choose>
             <if variable="genre">
               <text variable="genre" text-case="capitalize-first"/>
             </if>
             <else>
               <text term="letter" text-case="capitalize-first"/>
             </else>
           </choose>
         </if>
       </choose>
       <text macro="recipient-note"/>
     </group>
   </macro>
   <macro name="contributors">
     <group delimiter=". ">
       <names variable="author">
         <name name-as-sort-order="first" and="text" sort-separator=", " delimiter=", " delimiter-precedes-last="always"/>
         <substitute>
           <text macro="editor"/>
           <text macro="translator"/>
           <choose>
             <if type="webpage post-weblog" match="any">
               <text variable="container-title"/>
             </if>
           </choose>
         </substitute>
       </names>
       <text macro="recipient"/>
     </group>
   </macro>
   <macro name="recipient-short">
     <names variable="recipient">
       <label form="verb" text-case="lowercase" suffix=" "/>
       <name form="short" and="text" delimiter=", "/>
     </names>
   </macro>
   <macro name="contributors-short">
     <group delimiter=" ">
       <names variable="author">
         <name form="short" and="text" delimiter=", "/>
         <substitute>
           <names variable="editor"/>
           <names variable="translator"/>
         </substitute>
       </names>
       <text macro="recipient-short"/>
     </group>
   </macro>
   <macro name="contributors-sort">
     <names variable="author">
       <name name-as-sort-order="all" and="text" sort-separator=", " delimiter=", " delimiter-precedes-last="always"/>
       <substitute>
         <names variable="editor"/>
         <names variable="translator"/>
         <text macro="title"/>
       </substitute>
     </names>
   </macro>
   <macro name="interviewer-note">
     <names variable="interviewer" delimiter=", ">
       <label form="verb" text-case="lowercase" suffix=" "/>
       <name and="text" delimiter=", "/>
     </names>
   </macro>
   <macro name="interviewer">
     <names variable="interviewer" delimiter=", ">
       <label form="verb" text-case="capitalize-first" suffix=" "/>
       <name and="text" delimiter=", "/>
     </names>
   </macro>
   <macro name="title-note">
     <choose>
       <if variable="title" match="none">
         <text variable="genre"/>
       </if>
       <else-if type="book graphic map motion_picture song" match="any">
         <text variable="title" text-case="title" font-style="italic"/>
         <group delimiter=" " prefix=", ">
           <text term="version"/>
           <text variable="version"/>
         </group>
       </else-if>
       <else-if type="legal_case interview patent" match="any">
         <text variable="title"/>
       </else-if>
       <else-if variable="reviewed-author">
         <text variable="title" font-style="italic" prefix="review of "/>
       </else-if>
       <else>
         <text variable="title" text-case="title" quotes="true"/>
       </else>
     </choose>
   </macro>
   <macro name="title">
     <choose>
       <if variable="title" match="none">
         <choose>
           <if type="personal_communication" match="none">
             <text variable="genre" text-case="capitalize-first"/>
           </if>
         </choose>
       </if>
       <else-if type="book graphic motion_picture song" match="any">
         <text variable="title" text-case="title" font-style="italic"/>
         <group prefix=" (" suffix=")" delimiter=" ">
           <text term="version"/>
           <text variable="version"/>
         </group>
       </else-if>
       <else-if variable="reviewed-author">
         <group delimiter=", ">
           <text variable="title" font-style="italic" prefix="Review of "/>
           <names variable="reviewed-author">
             <label form="verb-short" text-case="lowercase" suffix=" "/>
             <name and="text" delimiter=", "/>
           </names>
         </group>
       </else-if>
       <else-if type="bill legislation legal_case interview patent" match="any">
         <text variable="title"/>
       </else-if>
       <else>
         <text variable="title" text-case="title" quotes="true"/>
       </else>
     </choose>
   </macro>
   <macro name="title-short">
     <choose>
       <if variable="title" match="none">
         <choose>
           <if type="interview">
             <text term="interview"/>
           </if>
           <else-if type="manuscript speech" match="any">
             <text variable="genre" form="short"/>
           </else-if>
         </choose>
       </if>
       <else-if type="book graphic motion_picture song" match="any">
         <text variable="title" text-case="title" form="short" font-style="italic"/>
       </else-if>
       <else-if type="legal_case" variable="title-short" match="all">
         <text variable="title" font-style="italic" form="short"/>
       </else-if>
       <else-if type="patent interview" match="any">
         <text variable="title" form="short"/>
       </else-if>
       <else-if type="legal_case bill legislation" match="any">
         <text variable="title"/>
       </else-if>
       <else>
         <text variable="title" text-case="title" form="short" quotes="true"/>
       </else>
     </choose>
   </macro>
   <macro name="date-disambiguate">
     <choose>
       <if disambiguate="true" type="personal_communication" match="any">
         <text macro="issued"/>
       </if>
     </choose>
   </macro>
   <macro name="description-note">
     <group delimiter=", ">
       <text macro="interviewer-note"/>
       <text variable="medium"/>
       <choose>
         <if variable="title" match="none"/>
         <else-if type="manuscript thesis speech" match="any"/>
         <else-if type="patent">
           <group delimiter=" ">
             <text variable="authority"/>
             <text variable="number"/>
           </group>
         </else-if>
         <else>
           <text variable="genre"/>
         </else>
       </choose>
       <choose>
         <if type="map">
           <text variable="scale"/>
         </if>
         <else-if type="graphic">
           <text variable="dimensions"/>
         </else-if>
       </choose>
     </group>
   </macro>
   <macro name="description">
     <group delimiter=", ">
       <group delimiter=". ">
         <text macro="interviewer"/>
         <text variable="medium" text-case="capitalize-first"/>
       </group>
       <choose>
         <if variable="title" match="none"/>
         <else-if type="thesis speech" match="any"/>
         <else-if type="patent">
           <group delimiter=" ">
             <text variable="authority"/>
             <text variable="number"/>
           </group>
         </else-if>
         <else>
           <text variable="genre" text-case="capitalize-first"/>
         </else>
       </choose>
       <choose>
         <if type="map">
           <text variable="scale"/>
         </if>
         <else-if type="graphic">
           <text variable="dimensions"/>
         </else-if>
       </choose>
     </group>
   </macro>
   <macro name="container-title-note">
     <group delimiter=" ">
       <choose>
         <if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="any">
           <text term="in"/>
         </if>
       </choose>
       <choose>
         <if type="webpage">
           <text variable="container-title"/>
         </if>
         <else-if type="post-weblog">
           <text variable="container-title" text-case="title" font-style="italic" suffix=" (blog)"/>
         </else-if>
         <else-if type="bill legislation legal_case" match="none">
           <text variable="container-title" text-case="title" font-style="italic"/>
         </else-if>
       </choose>
     </group>
   </macro>
   <macro name="container-title">
     <group delimiter=" ">
       <choose>
         <if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="any">
           <text term="in" text-case="capitalize-first"/>
         </if>
       </choose>
       <choose>
         <if type="webpage">
           <text variable="container-title"/>
         </if>
         <else-if type="post-weblog">
           <text variable="container-title" text-case="title" font-style="italic" suffix=" (blog)"/>
         </else-if>
         <else-if type="bill legislation legal_case" match="none">
           <text variable="container-title" text-case="title" font-style="italic"/>
         </else-if>
       </choose>
     </group>
   </macro>
   <macro name="collection-title">
     <choose>
       <if match="none" type="article-journal">
         <choose>
           <if match="none" is-numeric="collection-number">
             <group delimiter=", ">
               <text variable="collection-title" text-case="title"/>
               <text variable="collection-number"/>
             </group>
           </if>
           <else>
             <group delimiter=" ">
               <text variable="collection-title" text-case="title"/>
               <text variable="collection-number"/>
             </group>
           </else>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="collection-title-journal">
     <choose>
       <if type="article-journal">
         <group delimiter=" ">
           <text variable="collection-title"/>
           <text variable="collection-number"/>
         </group>
       </if>
     </choose>
   </macro>
   <macro name="edition-note">
     <choose>
       <if type="book chapter graphic motion_picture paper-conference report song" match="any">
         <choose>
           <if is-numeric="edition">
             <group delimiter=" ">
               <number variable="edition" form="ordinal"/>
               <text term="edition" form="short"/>
             </group>
           </if>
           <else>
             <text variable="edition"/>
           </else>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="edition">
     <choose>
       <if type="book chapter graphic motion_picture paper-conference report song" match="any">
         <choose>
           <if is-numeric="edition">
             <group delimiter=" ">
               <number variable="edition" form="ordinal"/>
               <text term="edition" form="short"/>
             </group>
           </if>
           <else>
             <text variable="edition" text-case="capitalize-first" suffix="."/>
           </else>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="locators-note-join-with-space">
     <choose>
       <if type="article-journal" variable="volume" match="all">
         <choose>
           <if match="none" variable="collection-title">
             <text macro="locators-note"/>
           </if>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="locators-note-join-with-comma">
     <choose>
       <if type="article-journal" match="none">
         <text macro="locators-note"/>
       </if>
       <else-if type="article-journal">
         <choose>
           <if variable="volume" match="none">
             <text macro="locators-note"/>
           </if>
           <else-if match="any" variable="collection-title">
             <text macro="locators-note"/>
           </else-if>
         </choose>
       </else-if>
     </choose>
   </macro>
   <macro name="locators-note">
     <choose>
       <if type="article-journal">
         <group delimiter=", ">
           <text macro="collection-title-journal"/>
           <text variable="volume"/>
           <group delimiter=" ">
             <text term="issue" form="short"/>
             <text variable="issue"/>
           </group>
         </group>
       </if>
       <else-if type="bill legislation legal_case" match="any">
         <text macro="legal-cites"/>
       </else-if>
       <else-if type="book chapter graphic motion_picture paper-conference report song" match="any">
         <group delimiter=", ">
           <text macro="edition-note"/>
           <group delimiter=" ">
             <text term="volume" form="short"/>
             <number variable="volume" form="numeric"/>
           </group>
           <choose>
             <if variable="locator" match="none">
               <group delimiter=" ">
                 <number variable="number-of-volumes" form="numeric"/>
                 <text term="volume" form="short" plural="true"/>
               </group>
             </if>
           </choose>
         </group>
       </else-if>
     </choose>
   </macro>
   <macro name="legal-cites">
     <choose>
       <if type="legal_case" match="any">
         <group delimiter=" ">
           <choose>
             <if variable="container-title">
               <text variable="volume"/>
               <text variable="container-title"/>
               <group delimiter=" ">
                 <!--change to label variable="section" as that becomes available -->
                 <text term="section" form="symbol"/>
                 <text variable="section"/>
               </group>
               <text variable="page"/>
             </if>
             <else>
               <text variable="number" prefix="No. "/>
             </else>
           </choose>
         </group>
       </if>
       <else-if type="bill legislation" match="any">
         <group delimiter=", ">
           <choose>
             <if variable="number">
               <!--There's a public law number-->
               <text variable="number" prefix="Pub. L. No. "/>
               <group delimiter=" ">
                 <!--change to label variable="section" as that becomes available -->
                 <text term="section" form="symbol"/>
                 <text variable="section"/>
               </group>
               <group delimiter=" ">
                 <text variable="volume"/>
                 <text variable="container-title"/>
                 <text variable="page-first"/>
               </group>
             </if>
             <else>
               <group delimiter=" ">
                 <text variable="volume"/>
                 <text variable="container-title"/>
                 <!--change to label variable="section" as that becomes available -->
                 <text term="section" form="symbol"/>
                 <text variable="section"/>
               </group>
             </else>
           </choose>
         </group>
       </else-if>
     </choose>
   </macro>
   <macro name="locators-join-with-space">
     <choose>
       <if type="article-journal" variable="volume" match="all">
         <choose>
           <if match="none" variable="collection-title">
             <text macro="locators"/>
           </if>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="locators-join-with-comma">
     <choose>
       <if type="bill chapter legislation legal_case paper-conference" match="any">
         <text macro="locators"/>
       </if>
       <else-if type="article-journal">
         <choose>
           <if variable="volume" match="none">
             <text macro="locators"/>
           </if>
           <else-if match="any" variable="collection-title">
             <text macro="locators"/>
           </else-if>
         </choose>
       </else-if>
     </choose>
   </macro>
   <macro name="locators-join-with-period">
     <choose>
       <if type="bill legislation legal_case article-journal chapter paper-conference" match="none">
         <text macro="locators"/>
       </if>
     </choose>
   </macro>
   <macro name="locators">
     <choose>
       <if type="article-journal">
         <group delimiter=", ">
           <text macro="collection-title-journal"/>
           <text variable="volume"/>
           <group delimiter=" ">
             <text term="issue" form="short"/>
             <text variable="issue"/>
           </group>
         </group>
       </if>
       <else-if type="bill legislation legal_case" match="any">
         <text macro="legal-cites"/>
       </else-if>
       <else-if type="book graphic motion_picture report song" match="any">
         <group delimiter=". ">
           <text macro="edition"/>
           <group delimiter=" ">
             <text term="volume" form="short" text-case="capitalize-first"/>
             <number variable="volume" form="numeric"/>
           </group>
           <group delimiter=" ">
             <number variable="number-of-volumes" form="numeric"/>
             <text term="volume" form="short" plural="true"/>
           </group>
         </group>
       </else-if>
       <else-if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="any">
         <group delimiter=". ">
           <text macro="edition"/>
           <choose>
             <if variable="page" match="none">
               <group delimiter=" ">
                 <text term="volume" form="short" text-case="capitalize-first"/>
                 <number variable="volume" form="numeric"/>
               </group>
             </if>
           </choose>
         </group>
       </else-if>
     </choose>
   </macro>
   <macro name="locators-newspaper">
     <choose>
       <if type="article-newspaper">
         <group delimiter=", ">
           <group delimiter=" ">
             <number variable="edition"/>
             <text term="edition"/>
           </group>
           <group delimiter=" ">
             <text term="section" form="short"/>
             <text variable="section"/>
           </group>
         </group>
       </if>
     </choose>
   </macro>
   <macro name="event-note">
     <text variable="event"/>
   </macro>
   <macro name="event">
     <choose>
       <if variable="title">
         <group delimiter=" ">
           <choose>
             <if variable="genre">
               <text term="presented at"/>
             </if>
             <else>
               <text term="presented at" text-case="capitalize-first"/>
             </else>
           </choose>
           <text variable="event"/>
         </group>
       </if>
       <else>
         <group delimiter=" ">
           <text term="presented at" text-case="capitalize-first"/>
           <text variable="event"/>
         </group>
       </else>
     </choose>
   </macro>
   <macro name="originally-published">
     <group delimiter=", ">
       <group delimiter=": ">
         <text variable="original-publisher-place"/>
         <text variable="original-publisher"/>
       </group>
       <choose>
         <if is-uncertain-date="original-date">
           <date variable="original-date" form="numeric" date-parts="year" prefix="[" suffix="?]"/>
         </if>
         <else>
           <date variable="original-date" form="numeric" date-parts="year"/>
         </else>
       </choose>
     </group>
   </macro>
   <macro name="reprint-note">
     <!--needs localization-->
     <choose>
       <if variable="original-date issued" match="all">
         <choose>
           <!--for whatever reason in notes, when we have both original and new publishers, reprint doesn't appear-->
           <if variable="original-publisher original-publisher-place" match="none">
             <text value="repr."/>
           </if>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="reprint">
     <!--needs localization-->
     <choose>
       <if variable="original-date issued" match="all">
         <text value="reprint" text-case="capitalize-first"/>
       </if>
     </choose>
   </macro>
   <macro name="publisher">
     <choose>
       <if type="thesis">
         <text variable="publisher"/>
       </if>
       <else-if type="speech">
         <text variable="event-place"/>
       </else-if>
       <else>
         <group delimiter=": ">
           <text variable="publisher-place"/>
           <text variable="publisher"/>
         </group>
       </else>
     </choose>
   </macro>
   <macro name="issued">
     <choose>
       <if variable="issued">
         <choose>
           <if type="legal_case">
             <group delimiter=" ">
               <text variable="authority"/>
               <choose>
                 <if variable="container-title" match="any">
                   <!--Only print year for cases published in reporters-->
                   <date variable="issued" form="numeric" date-parts="year"/>
                 </if>
                 <else>
                   <date variable="issued" form="text"/>
                 </else>
               </choose>
             </group>
           </if>
           <else-if type="book bill chapter  legislation motion_picture paper-conference song thesis" match="any">
             <choose>
               <if is-uncertain-date="issued">
                 <date variable="issued" form="numeric" date-parts="year" prefix="[" suffix="?]"/>
               </if>
               <else>
                 <date variable="issued" form="numeric" date-parts="year"/>
               </else>
             </choose>
           </else-if>
           <else-if type="patent">
             <group delimiter=", ">
               <group delimiter=" ">
                 <!--Needs Localization-->
                 <text value="filed"/>
                 <date variable="submitted" form="text"/>
               </group>
               <group delimiter=" ">
                 <choose>
                   <if variable="issued submitted" match="all">
                     <text term="and"/>
                   </if>
                 </choose>
                 <!--Needs Localization-->
                 <text value="issued"/>
                 <date variable="issued" form="text"/>
               </group>
             </group>
           </else-if>
           <else>
             <choose>
               <if is-uncertain-date="issued">
                 <date variable="issued" form="text" prefix="[" suffix="?]"/>
               </if>
               <else>
                 <date variable="issued" form="text"/>
               </else>
             </choose>
           </else>
         </choose>
       </if>
       <else-if variable="status">
         <text variable="status"/>
       </else-if>
       <else-if variable="accessed URL" match="all"/>
       <else>
         <text term="no date" form="short"/>
       </else>
     </choose>
   </macro>
   <macro name="point-locators-subsequent">
     <choose>
       <if type="legal_case" variable="locator" match="all">
         <choose>
           <if locator="page">
             <group delimiter=":">
               <text variable="volume"/>
               <text variable="locator"/>
             </group>
           </if>
           <else>
             <group delimiter=" ">
               <label variable="locator" form="short"/>
               <text variable="locator"/>
             </group>
           </else>
         </choose>
       </if>
       <else-if variable="locator">
         <choose>
           <if locator="page" match="none">
             <group delimiter=" ">
               <choose>
                 <if type="book graphic motion_picture report song" match="any">
                   <choose>
                     <if variable="volume">
                       <group delimiter=", ">
                         <group delimiter=" ">
                           <text term="volume" form="short"/>
                           <number variable="volume" form="numeric"/>
                         </group>
                         <label variable="locator" form="short"/>
                       </group>
                     </if>
                     <else>
                       <label variable="locator" form="short"/>
                     </else>
                   </choose>
                 </if>
                 <else>
                   <label variable="locator" form="short"/>
                 </else>
               </choose>
               <text variable="locator"/>
             </group>
           </if>
           <else-if type="book graphic motion_picture report song" match="any">
             <group delimiter=":">
               <number variable="volume" form="numeric"/>
               <text variable="locator"/>
             </group>
           </else-if>
           <else>
             <text variable="locator"/>
           </else>
         </choose>
       </else-if>
     </choose>
   </macro>
   <macro name="point-locators-join-with-colon">
     <choose>
       <if type="article-journal">
         <choose>
           <if variable="locator page" match="any">
             <choose>
               <if variable="volume issue" match="any">
                 <text macro="point-locators"/>
               </if>
             </choose>
           </if>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="point-locators-join-with-comma">
     <choose>
       <if type="article-journal" match="none">
         <text macro="point-locators"/>
       </if>
       <else-if variable="volume issue" match="none">
         <text macro="point-locators"/>
       </else-if>
     </choose>
   </macro>
   <macro name="point-locators">
     <choose>
       <if variable="locator" match="none">
         <choose>
           <if type="article-journal chapter paper-conference" match="any">
             <text variable="page"/>
           </if>
         </choose>
       </if>
       <else-if type="article-journal">
         <group delimiter=" ">
           <choose>
             <if locator="page" match="none">
               <label variable="locator" form="short" suffix=" "/>
             </if>
           </choose>
           <text variable="locator"/>
         </group>
       </else-if>
       <else-if type="legal_case"/>
       <else>
         <group delimiter=" ">
           <choose>
             <if locator="page" match="none">
               <label variable="locator" form="short"/>
             </if>
           </choose>
           <text variable="locator"/>
         </group>
       </else>
     </choose>
   </macro>
   <macro name="locators-chapter">
     <choose>
       <if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="any">
         <choose>
           <if variable="author container-author" match="all"/>
           <else>
             <choose>
               <if variable="page">
                 <text variable="volume" suffix=":"/>
                 <text variable="page"/>
               </if>
             </choose>
           </else>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="locators-journal-join-with-colon">
     <choose>
       <if type="article-journal">
         <choose>
           <if variable="volume issue" match="any">
             <text variable="page"/>
           </if>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="locators-journal-join-with-comma">
     <choose>
       <if type="article-journal">
         <choose>
           <if variable="volume issue" match="none">
             <text variable="page"/>
           </if>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="archive-note">
     <choose>
       <if type="thesis">
         <group delimiter=" ">
           <text variable="archive"/>
           <text variable="archive_location" prefix="(" suffix=")"/>
         </group>
       </if>
       <else>
         <group delimiter=", ">
           <text variable="archive_location"/>
           <text variable="archive"/>
           <text variable="archive-place"/>
         </group>
       </else>
     </choose>
   </macro>
   <macro name="archive">
     <choose>
       <if type="thesis">
         <group delimiter=" ">
           <text variable="archive"/>
           <text variable="archive_location" prefix="(" suffix=")"/>
         </group>
       </if>
       <else>
         <group delimiter=". ">
           <text variable="archive_location" text-case="capitalize-first"/>
           <text variable="archive"/>
           <text variable="archive-place"/>
         </group>
       </else>
     </choose>
   </macro>
   <macro name="issue-note-join-with-space">
     <choose>
       <if type="article-journal bill legislation legal_case manuscript thesis" variable="publisher-place event-place publisher" match="any">
         <!--Chicago doesn't use publisher/place for Newspapers and we want the date delimited by a comma-->
         <choose>
           <if type="article-newspaper" match="none">
             <choose>
               <if type="article-journal" match="none">
                 <text macro="issue-note"/>
               </if>
               <else-if variable="issue volume" match="any">
                 <text macro="issue-note"/>
               </else-if>
             </choose>
           </if>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="issue-note-join-with-comma">
     <choose>
       <if type="article-journal bill legislation legal_case manuscript speech thesis" variable="publisher-place publisher" match="none">
         <text macro="issue-note"/>
       </if>
       <else-if type="article-newspaper">
         <text macro="issue-note"/>
       </else-if>
       <else-if type="article-journal">
         <choose>
           <if variable="volume issue" match="none">
             <text macro="issue-note"/>
           </if>
         </choose>
       </else-if>
     </choose>
   </macro>
   <macro name="issue-map-graphic">
     <!--See CMoS 17th ed. 14.235 and 14.237-->
     <choose>
       <if type="graphic map" match="any">
         <choose>
           <if variable="publisher publisher-place" match="none">
             <text macro="issued"/>
           </if>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="issue-note">
     <choose>
       <if type="bill legislation legal_case" match="any">
         <text macro="issued" prefix="(" suffix=")"/>
       </if>
       <else-if type="article-journal">
         <choose>
           <if variable="volume issue" match="any">
             <text macro="issued" prefix="(" suffix=")"/>
           </if>
           <else>
             <text macro="issued"/>
           </else>
         </choose>
       </else-if>
       <else-if type="article-newspaper">
         <text macro="issued"/>
       </else-if>
       <else-if type="manuscript thesis speech" match="any">
         <group delimiter=", " prefix="(" suffix=")">
           <choose>
             <if variable="title" match="any">
               <text variable="genre"/>
             </if>
           </choose>
           <text variable="event"/>
           <text variable="event-place"/>
           <text variable="publisher"/>
           <text macro="issued"/>
         </group>
       </else-if>
       <else-if variable="publisher-place event-place publisher" match="any">
         <group prefix="(" suffix=")" delimiter=", ">
           <text macro="event-note"/>
           <group delimiter="; ">
             <text macro="originally-published"/>
             <group delimiter=", ">
               <text macro="reprint-note"/>
               <text macro="publisher"/>
             </group>
           </group>
           <text macro="issued"/>
         </group>
       </else-if>
       <else>
         <text macro="issued"/>
       </else>
     </choose>
   </macro>
   <macro name="issue-join-with-space">
     <choose>
       <if type="article-journal" match="any">
         <choose>
           <if variable="issue volume" match="any">
             <text macro="issue"/>
           </if>
         </choose>
       </if>
       <else-if type="bill legislation legal_case" match="any">
         <text macro="issue"/>
       </else-if>
     </choose>
   </macro>
   <macro name="issue-join-with-period">
     <choose>
       <if type="article-journal bill legislation legal_case" match="none">
         <choose>
           <if type="speech" variable="publisher publisher-place" match="any">
             <text macro="issue"/>
           </if>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="issue-join-with-comma">
     <choose>
       <if type="bill legislation legal_case" match="none">
         <choose>
           <if type="article-journal" match="none">
             <choose>
               <if type="speech" variable="publisher publisher-place" match="none">
                 <text macro="issue"/>
               </if>
             </choose>
           </if>
           <else-if variable="volume issue" match="none">
             <text macro="issue"/>
           </else-if>
         </choose>
       </if>
     </choose>
   </macro>
   <macro name="issue">
     <choose>
       <if type="bill legislation legal_case" match="any">
         <text macro="issued" prefix="(" suffix=")"/>
       </if>
       <else-if type="article-journal">
         <choose>
           <if variable="issue volume" match="any">
             <text macro="issued" prefix="(" suffix=")"/>
           </if>
           <else>
             <text macro="issued"/>
           </else>
         </choose>
       </else-if>
       <else-if type="speech">
         <group delimiter=", ">
           <group delimiter=" ">
             <choose>
               <if variable="title" match="none"/>
               <else>
                 <text variable="genre" text-case="capitalize-first"/>
               </else>
             </choose>
             <text macro="event"/>
           </group>
           <text variable="event-place"/>
           <text macro="issued"/>
         </group>
       </else-if>
       <!--Chicago doesn't use publisher/place for Newspapers -->
       <else-if type="article-newspaper">
         <text macro="issued"/>
       </else-if>
       <else-if variable="publisher-place publisher" match="any">
         <group delimiter=", ">
           <choose>
             <if type="thesis">
               <text variable="genre" text-case="capitalize-first"/>
             </if>
           </choose>
           <group delimiter=". ">
             <text macro="originally-published"/>
             <group delimiter=", ">
               <text macro="reprint"/>
               <text macro="publisher"/>
             </group>
           </group>
           <text macro="issued"/>
         </group>
       </else-if>
       <!--location for data for maps and artwork is different-->
       <else-if type="graphic map" match="none">
         <text macro="issued"/>
       </else-if>
     </choose>
   </macro>
   <macro name="access-note">
     <group delimiter=", ">
       <choose>
         <if type="graphic report" match="any">
           <text macro="archive-note"/>
         </if>
         <else-if type="article-journal bill book chapter legal_case legislation motion_picture paper-conference" match="none">
           <text macro="archive-note"/>
         </else-if>
       </choose>
       <choose>
         <if variable="issued" match="none">
           <group delimiter=" ">
             <text term="accessed"/>
             <date variable="accessed" form="text"/>
           </group>
         </if>
       </choose>
       <choose>
         <if type="legal_case" match="none">
           <choose>
             <if variable="DOI">
               <text variable="DOI" prefix="https://doi.org/"/>
             </if>
             <else>
               <text variable="URL"/>
             </else>
           </choose>
         </if>
       </choose>
     </group>
   </macro>
   <macro name="access">
     <group delimiter=". ">
       <choose>
         <if type="graphic report" match="any">
           <text macro="archive"/>
         </if>
         <else-if type="article-journal bill book chapter legal_case legislation motion_picture paper-conference" match="none">
           <text macro="archive"/>
         </else-if>
       </choose>
       <choose>
         <if variable="issued" match="none">
           <group delimiter=" ">
             <text term="accessed" text-case="capitalize-first"/>
             <date variable="accessed" form="text"/>
           </group>
         </if>
       </choose>
       <choose>
         <if type="legal_case" match="none">
           <choose>
             <if variable="DOI">
               <text variable="DOI" prefix="https://doi.org/"/>
             </if>
             <else>
               <text variable="URL"/>
             </else>
           </choose>
         </if>
       </choose>
     </group>
   </macro>
   <macro name="case-locator-subsequent">
     <choose>
       <if type="legal_case">
         <group delimiter=" ">
           <text variable="volume"/>
           <text variable="container-title"/>
         </group>
       </if>
     </choose>
   </macro>
   <macro name="case-pinpoint-subsequent">
     <choose>
       <if type="legal_case">
         <group delimiter=" ">
           <choose>
             <if locator="page">
               <text term="at"/>
               <text variable="locator"/>
             </if>
             <else>
               <label variable="locator"/>
               <text variable="locator"/>
             </else>
           </choose>
         </group>
       </if>
     </choose>
   </macro>
   <citation et-al-min="4" et-al-use-first="1" disambiguate-add-names="true">
     <layout suffix="." delimiter="; ">
       <choose>
         <if position="ibid ibid-with-locator" match="any">
           <group delimiter=", ">
             <text macro="contributors-short"/>
             <group delimiter=" ">
               <group delimiter=", ">
                 <choose>
                   <if variable="author editor translator" match="none">
                     <text macro="title-short"/>
                   </if>
                 </choose>
                 <text macro="case-locator-subsequent"/>
               </group>
               <text macro="case-pinpoint-subsequent"/>
             </group>
             <choose>
               <if match="none" type="legal_case">
                 <text macro="point-locators-subsequent"/>
               </if>
             </choose>
           </group>
         </if>
         <else>
           <group delimiter=", ">
             <text macro="contributors-short"/>
             <group delimiter=" ">
               <group delimiter=", ">
                 <text macro="title-short"/>
                 <!--if title & author are the same: -->
                 <text macro="date-disambiguate"/>
                 <text macro="case-locator-subsequent"/>
               </group>
               <text macro="case-pinpoint-subsequent"/>
             </group>
             <choose>
               <if match="none" type="legal_case">
                 <text macro="point-locators-subsequent"/>
               </if>
             </choose>
           </group>
         </else>
       </choose>
     </layout>
   </citation>
   <bibliography hanging-indent="true" et-al-min="11" et-al-use-first="7" subsequent-author-substitute="&#8212;&#8212;&#8212;" entry-spacing="0">
     <sort>
       <key macro="contributors-sort"/>
       <key variable="title"/>
       <key variable="genre"/>
       <key variable="issued"/>
     </sort>
     <layout suffix=".">
       <group delimiter=". ">
         <group delimiter=": ">
           <group delimiter=", ">
             <group delimiter=" ">
               <group delimiter=". ">
                 <group delimiter=" ">
                   <group delimiter=", ">
                     <group delimiter=". ">
                       <group delimiter=". ">
                         <text macro="contributors"/>
                         <text macro="title"/>
                         <text macro="issue-map-graphic"/>
                       </group>
                       <text macro="description"/>
                       <text macro="secondary-contributors"/>
                       <group delimiter=", ">
                         <text macro="container-title"/>
                         <text macro="container-contributors"/>
                       </group>
                       <text macro="locators-join-with-period"/>
                     </group>
                     <text macro="locators-join-with-comma"/>
                     <text macro="locators-chapter"/>
                   </group>
                   <text macro="locators-join-with-space"/>
                 </group>
                 <text macro="collection-title"/>
                 <text macro="issue-join-with-period"/>
               </group>
               <text macro="issue-join-with-space"/>
             </group>
             <text macro="issue-join-with-comma"/>
             <text macro="locators-journal-join-with-comma"/>
             <text macro="locators-newspaper"/>
           </group>
           <text macro="locators-journal-join-with-colon"/>
         </group>
         <text macro="access"/>
       </group>
       <text variable="note" display="block"/>
     </layout>
   </bibliography>
 </style>`;

export const getTemplate =  ((type:any) => {

if(type === 'chicago') {
    return CHICAGO_TEMPLATE;
}

});