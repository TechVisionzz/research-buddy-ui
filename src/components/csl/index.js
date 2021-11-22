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
var MLA_TEMPLATE=`<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="sort-only" page-range-format="minimal" default-locale="en-GB">
  <info>
    <title>Cardiff University - Vancouver</title>
    <id>http://www.zotero.org/styles/cardiff-university-vancouver</id>
    <link href="http://www.zotero.org/styles/cardiff-university-vancouver" rel="self"/>
    <link href="http://www.zotero.org/styles/vancouver" rel="template"/>
    <link href="http://www.nlm.nih.gov/bsd/uniform_requirements.html" rel="documentation"/>
    <link href="https://xerte.cardiff.ac.uk/play_4351" rel="documentation"/>
    <link href="https://xerte.cardiff.ac.uk/play_4069#page2" rel="documentation"/>
    <author>
      <name>Zoe Young</name>
      <email>YoungZ@cardiff.ac.uk</email>
    </author>
    <category citation-format="numeric"/>
    <category field="generic-base"/>
    <summary>Cardiff University adapted Vancouver style as outlined by International Committee of Medical Journal Editors Uniform Requirements for Manuscripts Submitted to Biomedical Journals: Sample References</summary>
    <updated>2018-02-05T10:42:47+00:00</updated>
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
  </info>
  <locale xml:lang="en">
    <date form="text" delimiter=" ">
      <date-part name="year"/>
      <date-part name="month" form="short" strip-periods="true"/>
      <date-part name="day"/>
    </date>
    <terms>
      <term name="collection-editor" form="long">
        <single>editor</single>
        <multiple>editors</multiple>
      </term>
      <term name="presented at">presented at</term>
      <term name="available at">available from</term>
      <term name="section" form="short">sect.</term>
    </terms>
  </locale>
  <macro name="author">
    <names variable="author">
      <name sort-separator=" " initialize-with="" name-as-sort-order="all" delimiter=", " delimiter-precedes-last="always"/>
      <label form="long" prefix=", "/>
      <substitute>
        <names variable="editor"/>
      </substitute>
    </names>
  </macro>
  <macro name="editor">
    <names variable="editor" suffix=".">
      <name sort-separator=" " initialize-with="" name-as-sort-order="all" delimiter=", " delimiter-precedes-last="always"/>
      <label form="long" prefix=", "/>
    </names>
  </macro>
  <macro name="chapter-marker">
    <choose>
      <if type="chapter paper-conference entry-dictionary entry-encyclopedia" match="any">
        <text term="in" text-case="capitalize-first"/>
      </if>
    </choose>
  </macro>
  <macro name="publisher">
    <choose>
      <if type="article-journal article-magazine article-newspaper patent" match="none">
        <group delimiter=": " suffix=";">
          <choose>
            <if type="thesis">
              <text variable="publisher-place"/>
            </if>
            <else-if type="speech"/>
            <else>
              <text variable="publisher-place"/>
            </else>
          </choose>
          <text variable="publisher"/>
        </group>
      </if>
    </choose>
  </macro>
  <macro name="access">
    <choose>
      <if variable="URL" match="all">
        <group prefix="[" suffix="]" delimiter=" ">
          <text term="accessed" text-case="lowercase"/>
          <date variable="accessed">
            <date-part name="day" suffix=" "/>
            <date-part name="month" form="short" strip-periods="true" suffix=" "/>
            <date-part name="year"/>
          </date>
        </group>
        <group prefix=" " delimiter=": ">
          <text term="available at" text-case="capitalize-first"/>
          <text variable="URL"/>
        </group>
      </if>
      <else-if match="all" variable="DOI">
        <text variable="DOI" prefix="doi: "/>
      </else-if>
    </choose>
  </macro>
  <macro name="container-title">
    <choose>
      <if type="article-journal article-magazine chapter paper-conference article-newspaper review review-book entry-dictionary entry-encyclopedia" match="any">
        <group suffix="." delimiter=" ">
          <choose>
            <if type="article-journal review review-book" match="any">
              <text variable="container-title" form="short" strip-periods="true"/>
            </if>
            <else>
              <text variable="container-title" strip-periods="true"/>
            </else>
          </choose>
          <choose>
            <if variable="URL"/>
          </choose>
        </group>
        <text macro="edition" prefix=" "/>
      </if>
      <else-if type="bill legislation" match="any">
        <group delimiter=", ">
          <group delimiter=". ">
            <text variable="container-title"/>
            <group delimiter=" ">
              <text variable="section"/>
            </group>
          </group>
          <text variable="number"/>
        </group>
      </else-if>
      <else-if type="speech">
        <group delimiter=": " suffix=";">
          <group delimiter=" ">
            <text variable="genre" text-case="capitalize-first"/>
            <text term="presented at"/>
          </group>
          <text variable="event"/>
        </group>
      </else-if>
      <else>
        <group delimiter=", " suffix=".">
          <choose>
            <if variable="collection-title" match="none">
              <group delimiter=" ">
                <label variable="volume" form="short" text-case="capitalize-first"/>
                <text variable="volume"/>
              </group>
            </if>
          </choose>
          <text variable="container-title"/>
        </group>
      </else>
    </choose>
  </macro>
  <macro name="title">
    <text variable="title"/>
    <choose>
      <if type="article-journal article-magazine chapter paper-conference article-newspaper review review-book entry-dictionary entry-encyclopedia post-weblog" match="none">
        <text macro="edition" prefix=". "/>
      </if>
    </choose>
    <choose>
      <if type="thesis">
        <text variable="genre" prefix=" [" suffix="]"/>
      </if>
    </choose>
  </macro>
  <macro name="edition">
    <choose>
      <if is-numeric="edition">
        <group delimiter=" ">
          <number variable="edition" form="ordinal"/>
          <text term="edition" form="short"/>
        </group>
      </if>
      <else>
        <text variable="edition" suffix="."/>
      </else>
    </choose>
  </macro>
  <macro name="date">
    <choose>
      <if type="article-journal article-magazine article-newspaper review review-book" match="any">
        <group suffix=";" delimiter=" ">
          <date variable="issued" form="text"/>
        </group>
      </if>
      <else-if type="bill legislation" match="any">
        <group delimiter=", ">
          <date variable="issued" delimiter=" ">
            <date-part name="month" form="short" strip-periods="true"/>
            <date-part name="day"/>
          </date>
          <date variable="issued">
            <date-part name="year"/>
          </date>
        </group>
      </else-if>
      <else-if type="report">
        <date variable="issued" delimiter=" ">
          <date-part name="year"/>
          <date-part name="month" form="short" strip-periods="true"/>
        </date>
      </else-if>
      <else-if type="patent">
        <group delimiter=".">
          <group>
            <text variable="publisher-place"/>
            <text variable="number" prefix=" patent " suffix=". "/>
            <date form="text" variable="issued"/>
          </group>
        </group>
      </else-if>
      <else-if type="speech">
        <group delimiter="; ">
          <group delimiter=" ">
            <date variable="issued" delimiter=" ">
              <date-part name="year"/>
              <date-part name="month" form="short" strip-periods="true"/>
              <date-part name="day"/>
            </date>
          </group>
          <text variable="event-place"/>
        </group>
      </else-if>
      <else-if type="post-weblog personal_communication" match="any">
        <date form="text" date-parts="year-month-day" variable="issued"/>
      </else-if>
      <else>
        <group suffix=".">
          <date variable="issued">
            <date-part name="year"/>
          </date>
        </group>
      </else>
    </choose>
  </macro>
  <macro name="pages">
    <choose>
      <if type="article-journal article-magazine review review-book" match="any">
        <text variable="page" strip-periods="false" prefix=":"/>
      </if>
      <else-if type="book" match="any">
        <text variable="number-of-pages" prefix=" "/>
        <choose>
          <if is-numeric="number-of-pages">
            <label variable="number-of-pages" form="short" prefix=" " plural="never"/>
          </if>
        </choose>
      </else-if>
      <else-if type="article-newspaper" match="any">
        <text variable="section" form="short" prefix=" Sect. "/>
        <choose>
          <if match="any" is-numeric="page">
            <label plural="never" prefix=" (" variable="page" form="short"/>
          </if>
        </choose>
        <text variable="page" form="short" suffix=")"/>
      </else-if>
      <else>
        <group prefix=" " delimiter=" ">
          <label variable="page" form="short" plural="never"/>
          <text variable="page"/>
        </group>
      </else>
    </choose>
  </macro>
  <macro name="journal-location">
    <choose>
      <if type="article-journal article-magazine review review-book" match="any">
        <text variable="volume"/>
        <text variable="issue" prefix="(" suffix=")"/>
      </if>
    </choose>
  </macro>
  <macro name="collection-details">
    <choose>
      <if type="article-journal article-magazine article-newspaper review review-book" match="none">
        <choose>
          <if variable="collection-title">
            <group delimiter=" " prefix="(" suffix=")">
              <names variable="collection-editor" suffix=".">
                <name sort-separator=" " initialize-with="" name-as-sort-order="all" delimiter=", " delimiter-precedes-last="always"/>
                <label form="long" prefix=", "/>
              </names>
              <group delimiter="; ">
                <text variable="collection-title"/>
                <group delimiter=" ">
                  <label variable="volume" form="short"/>
                  <text variable="volume"/>
                </group>
              </group>
            </group>
          </if>
        </choose>
      </if>
    </choose>
  </macro>
  <macro name="report-details">
    <choose>
      <if type="report">
        <text variable="number" prefix="Report No.: "/>
      </if>
    </choose>
  </macro>
  <citation collapse="citation-number">
    <sort>
      <key variable="citation-number"/>
    </sort>
    <layout prefix="(" suffix=")" delimiter=",">
      <text variable="citation-number"/>
    </layout>
  </citation>
  <bibliography et-al-min="7" et-al-use-first="6" second-field-align="flush">
    <layout>
      <text variable="citation-number" suffix=". "/>
      <group delimiter=". " suffix=". ">
        <text macro="author"/>
        <text macro="title"/>
      </group>
      <group delimiter=" " suffix=". ">
        <group delimiter=": ">
          <text macro="chapter-marker"/>
          <group delimiter=" ">
            <text macro="editor"/>
            <text macro="container-title"/>
          </group>
        </group>
        <text macro="publisher"/>
        <group>
          <text macro="date"/>
          <text macro="journal-location"/>
          <text macro="pages"/>
        </group>
      </group>
      <text macro="collection-details" suffix=". "/>
      <text macro="report-details" suffix=". "/>
      <text macro="access"/>
    </layout>
  </bibliography>
</style>`;
var APA_TEMPLATE=`<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="never" page-range-format="expanded">
  <info>
    <title>American Psychological Association 6th edition</title>
    <title-short>APA (6th ed.)</title-short>
    <id>http://www.zotero.org/styles/apa-6th-edition</id>
    <link href="http://www.zotero.org/styles/apa-6th-edition" rel="self"/>
    <link href="http://owl.english.purdue.edu/owl/resource/560/01/" rel="documentation"/>
    <author>
      <name>Simon Kornblith</name>
      <email>simon@simonster.com</email>
    </author>
    <author>
      <name> Brenton M. Wiernik</name>
      <email>zotero@wiernik.org</email>
    </author>
    <contributor>
      <name>Bruce D'Arcus</name>
    </contributor>
    <contributor>
      <name>Curtis M. Humphrey</name>
    </contributor>
    <contributor>
      <name>Richard Karnesky</name>
      <email>karnesky+zotero@gmail.com</email>
      <uri>http://arc.nucapt.northwestern.edu/Richard_Karnesky</uri>
    </contributor>
    <contributor>
      <name>Sebastian Karcher</name>
    </contributor>
    <category citation-format="author-date"/>
    <category field="psychology"/>
    <category field="generic-base"/>
    <updated>2016-09-28T13:09:49+00:00</updated>
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
  </info>
  <locale xml:lang="en">
    <terms>
      <term name="editortranslator" form="short">
        <single>ed. &amp; trans.</single>
        <multiple>eds. &amp; trans.</multiple>
      </term>
      <term name="translator" form="short">trans.</term>
      <term name="interviewer" form="short">
        <single>interviewer</single>
        <multiple>interviewers</multiple>
      </term>
      <term name="collection-editor" form="short">
        <single>series ed.</single>
        <multiple>series eds.</multiple>
      </term>
      <term name="circa" form="short">ca.</term>
      <term name="bc"> B.C.E.</term>
      <term name="ad"> C.E.</term>
    </terms>
  </locale>
  <locale xml:lang="es">
    <terms>
      <term name="from">de</term>
    </terms>
  </locale>
  <locale xml:lang="de">
    <terms>
      <term name="et-al">et al.</term>
    </terms>
  </locale>
  <locale xml:lang="da">
    <terms>
      <term name="et-al">et al.</term>
    </terms>
  </locale>
  <locale xml:lang="nn">
    <terms>
      <term name="et-al">et al.</term>
    </terms>
  </locale>
  <locale xml:lang="nl">
    <terms>
      <term name="et-al">et al.</term>
    </terms>
  </locale>
  <locale xml:lang="nb">
    <terms>
      <term name="et-al">et al.</term>
    </terms>
  </locale>
  <locale xml:lang="fr">
    <terms>
      <term name="editor" form="short">
        <single>éd.</single>
        <multiple>éds.</multiple>
      </term>
    </terms>
  </locale>
  <macro name="container-contributors-booklike">
    <choose>
      <if variable="container-title">
        <names variable="editor translator" delimiter=", &amp; ">
          <name and="symbol" initialize-with=". " delimiter=", "/>
          <label form="short" prefix=" (" text-case="title" suffix=")"/>
          <substitute>
            <names variable="editorial-director"/>
            <names variable="collection-editor"/>
            <names variable="container-author"/>
          </substitute>
        </names>
      </if>
    </choose>
  </macro>
  <macro name="container-contributors">
    <choose>
      <!-- book is here to catch software with container titles -->
      <if type="book broadcast chapter entry entry-dictionary entry-encyclopedia graphic map personal_communication report speech" match="any">
        <text macro="container-contributors-booklike"/>
      </if>
      <else-if type="paper-conference">
        <choose>
          <if variable="collection-editor container-author editor" match="any">
            <text macro="container-contributors-booklike"/>
          </if>
        </choose>
      </else-if>
    </choose>
  </macro>
  <macro name="secondary-contributors-booklike">
    <group delimiter="; ">
      <choose>
        <if variable="title">
          <names variable="interviewer">
            <name and="symbol" initialize-with=". " delimiter=", "/>
            <label form="short" prefix=", " text-case="title"/>
          </names>
        </if>
      </choose>
      <choose>
        <if variable="container-title" match="none">
          <group delimiter="; ">
            <names variable="container-author">
              <label form="verb-short" suffix=" " text-case="title"/>
              <name and="symbol" initialize-with=". " delimiter=", "/>
            </names>
            <names variable="editor translator" delimiter="; ">
              <name and="symbol" initialize-with=". " delimiter=", "/>
              <label form="short" prefix=", " text-case="title"/>
            </names>
          </group>
        </if>
      </choose>
    </group>
  </macro>
  <macro name="secondary-contributors">
    <choose>
      <!-- book is here to catch software with container titles -->
      <if type="book broadcast chapter entry entry-dictionary entry-encyclopedia graphic map report" match="any">
        <text macro="secondary-contributors-booklike"/>
      </if>
      <else-if type="personal_communication">
        <group delimiter="; ">
          <group delimiter=" ">
            <choose>
              <if variable="genre" match="any">
                <text variable="genre" text-case="capitalize-first"/>
              </if>
              <else>
                <text term="letter" text-case="capitalize-first"/>
              </else>
            </choose>
            <names variable="recipient" delimiter=", ">
              <label form="verb" suffix=" "/>
              <name and="symbol" delimiter=", "/>
            </names>
          </group>
          <text variable="medium" text-case="capitalize-first"/>
          <choose>
            <if variable="container-title" match="none">
              <names variable="editor translator" delimiter="; ">
                <name and="symbol" initialize-with=". " delimiter=", "/>
                <label form="short" prefix=", " text-case="title"/>
              </names>
            </if>
          </choose>
        </group>
      </else-if>
      <else-if type="song">
        <choose>
          <if variable="original-author composer" match="any">
            <group delimiter="; ">
              <!-- Replace prefix with performer label as that becomes available -->
              <names variable="author" prefix="Recorded by ">
                <label form="verb" text-case="title"/>
                <name and="symbol" initialize-with=". " delimiter=", "/>
              </names>
              <names variable="translator">
                <name and="symbol" initialize-with=". " delimiter=", "/>
                <label form="short" prefix=", " text-case="title"/>
              </names>
            </group>
          </if>
        </choose>
      </else-if>
      <else-if type="article-journal article-magazine article-newspaper" match="any">
        <group delimiter="; ">
          <choose>
            <if variable="title">
              <names variable="interviewer" delimiter="; ">
                <name and="symbol" initialize-with=". " delimiter=", "/>
                <label form="short" prefix=", " text-case="title"/>
              </names>
            </if>
          </choose>
          <names variable="translator" delimiter="; ">
            <name and="symbol" initialize-with=". " delimiter=", "/>
            <label form="short" prefix=", " text-case="title"/>
          </names>
        </group>
      </else-if>
      <else-if type="paper-conference">
        <choose>
          <if variable="collection-editor editor" match="any">
            <text macro="secondary-contributors-booklike"/>
          </if>
          <else>
            <group delimiter="; ">
              <choose>
                <if variable="title">
                  <names variable="interviewer" delimiter="; ">
                    <name and="symbol" initialize-with=". " delimiter=", "/>
                    <label form="short" prefix=", " text-case="title"/>
                  </names>
                </if>
              </choose>
              <names variable="translator" delimiter="; ">
                <name and="symbol" initialize-with=". " delimiter=", "/>
                <label form="short" prefix=", " text-case="title"/>
              </names>
            </group>
          </else>
        </choose>
      </else-if>
      <else>
        <group delimiter="; ">
          <choose>
            <if variable="title">
              <names variable="interviewer">
                <name and="symbol" initialize-with=". " delimiter="; "/>
                <label form="short" prefix=", " text-case="title"/>
              </names>
            </if>
          </choose>
          <names variable="editor translator" delimiter="; ">
            <name and="symbol" initialize-with=". " delimiter=", "/>
            <label form="short" prefix=", " text-case="title"/>
          </names>
        </group>
      </else>
    </choose>
  </macro>
  <macro name="author">
    <choose>
      <if type="song">
        <names variable="composer" delimiter=", ">
          <name name-as-sort-order="all" and="symbol" sort-separator=", " initialize-with=". " delimiter=", " delimiter-precedes-last="always"/>
          <substitute>
            <names variable="original-author"/>
            <names variable="author"/>
            <names variable="translator">
              <name name-as-sort-order="all" and="symbol" sort-separator=", " initialize-with=". " delimiter=", " delimiter-precedes-last="always"/>
              <label form="short" prefix=" (" suffix=")" text-case="title"/>
            </names>
            <group delimiter=" ">
              <text macro="title"/>
              <text macro="description"/>
              <text macro="format"/>
            </group>
          </substitute>
        </names>
      </if>
      <else-if type="treaty"/>
      <else>
        <names variable="author" delimiter=", ">
          <name name-as-sort-order="all" and="symbol" sort-separator=", " initialize-with=". " delimiter=", " delimiter-precedes-last="always"/>
          <substitute>
            <names variable="illustrator"/>
            <names variable="composer"/>
            <names variable="director">
              <name name-as-sort-order="all" and="symbol" sort-separator=", " initialize-with=". " delimiter=", " delimiter-precedes-last="always"/>
              <label form="long" prefix=" (" suffix=")" text-case="title"/>
            </names>
            <choose>
              <if variable="container-title">
                <choose>
                  <if type="book entry entry-dictionary entry-encyclopedia" match="any">
                    <text macro="title"/>
                  </if>
                  <else>
                    <names variable="translator"/>
                  </else>
                </choose>
                <names variable="translator">
                  <name name-as-sort-order="all" and="symbol" sort-separator=", " initialize-with=". " delimiter=", " delimiter-precedes-last="always"/>
                  <label form="short" prefix=" (" suffix=")" text-case="title"/>
                </names>
              </if>
            </choose>
            <names variable="editor translator" delimiter=", ">
              <name name-as-sort-order="all" and="symbol" sort-separator=", " initialize-with=". " delimiter=", " delimiter-precedes-last="always"/>
              <label form="short" prefix=" (" suffix=")" text-case="title"/>
            </names>
            <names variable="editorial-director">
              <name name-as-sort-order="all" and="symbol" sort-separator=", " initialize-with=". " delimiter=", " delimiter-precedes-last="always"/>
              <label form="short" prefix=" (" suffix=")" text-case="title"/>
            </names>
            <names variable="collection-editor">
              <name name-as-sort-order="all" and="symbol" sort-separator=", " initialize-with=". " delimiter=", " delimiter-precedes-last="always"/>
              <label form="short" prefix=" (" suffix=")" text-case="title"/>
            </names>
            <choose>
              <if type="report">
                <text variable="publisher"/>
              </if>
            </choose>
            <group delimiter=" ">
              <text macro="title"/>
              <text macro="description"/>
              <text macro="format"/>
            </group>
          </substitute>
        </names>
      </else>
    </choose>
  </macro>
  <macro name="author-short">
    <choose>
      <if type="patent" variable="number" match="all">
        <text macro="patent-number"/>
      </if>
      <else-if type="treaty">
        <text variable="title" form="short" text-case="title"/>
      </else-if>
      <else-if type="personal_communication">
        <choose>
          <if variable="archive DOI publisher URL" match="none">
            <group delimiter=", ">
              <names variable="author">
                <name and="symbol" delimiter=", " initialize-with=". "/>
                <substitute>
                  <text variable="title" form="short" text-case="title" quotes="true"/>
                </substitute>
              </names>
              <!-- This should be localized -->
              <text value="personal communication"/>
            </group>
          </if>
          <else>
            <names variable="author" delimiter=", ">
              <name form="short" and="symbol" delimiter=", " initialize-with=". "/>
              <substitute>
                <names variable="editor"/>
                <names variable="translator"/>
                <choose>
                  <if variable="container-title">
                    <text variable="title" form="short" text-case="title" quotes="true"/>
                  </if>
                  <else>
                    <text variable="title" form="short" text-case="title" font-style="italic"/>
                  </else>
                </choose>
                <text macro="format-short" prefix="[" suffix="]"/>
              </substitute>
            </names>
          </else>
        </choose>
      </else-if>
      <else-if type="song">
        <names variable="composer" delimiter=", ">
          <name form="short" and="symbol" delimiter=", " initialize-with=". "/>
          <substitute>
            <names variable="original-author"/>
            <names variable="author"/>
            <names variable="translator"/>
            <choose>
              <if variable="container-title">
                <text variable="title" form="short" text-case="title" quotes="true"/>
              </if>
              <else>
                <text variable="title" form="short" text-case="title" font-style="italic"/>
              </else>
            </choose>
            <text macro="format-short" prefix="[" suffix="]"/>
          </substitute>
        </names>
      </else-if>
      <else>
        <names variable="author" delimiter=", ">
          <name form="short" and="symbol" delimiter=", " initialize-with=". "/>
          <substitute>
            <names variable="illustrator"/>
            <names variable="composer"/>
            <names variable="director"/>
            <choose>
              <if variable="container-title">
                <choose>
                  <if type="book entry entry-dictionary entry-encyclopedia" match="any">
                    <text variable="title" form="short" text-case="title" quotes="true"/>
                  </if>
                  <else>
                    <names variable="translator"/>
                  </else>
                </choose>
              </if>
            </choose>
            <names variable="editor"/>
            <names variable="editorial-director"/>
            <names variable="translator"/>
            <choose>
              <if type="report" variable="publisher" match="all">
                <text variable="publisher"/>
              </if>
              <else-if type="legal_case">
                <text variable="title" font-style="italic"/>
              </else-if>
              <else-if type="bill legislation" match="any">
                <text variable="title" form="short" text-case="title"/>
              </else-if>
              <else-if variable="reviewed-author" type="review review-book" match="any">
                <text macro="format-short" prefix="[" suffix="]"/>
              </else-if>
              <else-if type="post post-weblog webpage" variable="container-title" match="any">
                <text variable="title" form="short" text-case="title" quotes="true"/>
              </else-if>
              <else>
                <text variable="title" form="short" text-case="title" font-style="italic"/>
              </else>
            </choose>
            <text macro="format-short" prefix="[" suffix="]"/>
          </substitute>
        </names>
      </else>
    </choose>
  </macro>
  <macro name="patent-number">
    <!-- authority: U.S. ; genre: patent ; number: 123,445 -->
    <group delimiter=" ">
      <text variable="authority"/>
      <choose>
        <if variable="genre">
          <text variable="genre" text-case="capitalize-first"/>
        </if>
        <else>
          <!-- This should be localized -->
          <text value="patent" text-case="capitalize-first"/>
        </else>
      </choose>
      <group delimiter=" ">
        <text term="issue" form="short" text-case="capitalize-first"/>
        <text variable="number"/>
      </group>
    </group>
  </macro>
  <macro name="access">
    <choose>
      <if type="bill legal_case legislation" match="any"/>
      <else-if variable="DOI" match="any">
        <text variable="DOI" prefix="https://doi.org/"/>
      </else-if>
      <else-if variable="URL">
        <group delimiter=" ">
          <text term="retrieved" text-case="capitalize-first"/>
          <choose>
            <if type="post post-weblog webpage" match="any">
              <date variable="accessed" form="text" suffix=","/>
            </if>
          </choose>
          <text term="from"/>
          <choose>
            <if type="report">
              <choose>
                <if variable="author editor translator" match="any">
                  <!-- This should be localized -->
                  <text variable="publisher" suffix=" website:"/>
                </if>
              </choose>
            </if>
            <else-if type="post post-weblog webpage" match="any">
              <!-- This should be localized -->
              <text variable="container-title" suffix=" website:"/>
            </else-if>
          </choose>
          <text variable="URL"/>
        </group>
      </else-if>
      <else-if variable="archive">
        <choose>
          <if type="article article-journal article-magazine article-newspaper dataset paper-conference report speech thesis" match="any">
            <!-- This section is for electronic database locations. Physical archives for these and other item types are called in 'publisher' macro -->
            <choose>
              <if variable="archive-place" match="none">
                <group delimiter=" ">
                  <text term="retrieved" text-case="capitalize-first"/>
                  <text term="from"/>
                  <text variable="archive" suffix="."/>
                  <text variable="archive_location" prefix="(" suffix=")"/>
                </group>
              </if>
            </choose>
          </if>
        </choose>
      </else-if>
    </choose>
  </macro>
  <macro name="title">
    <choose>
      <if type="treaty">
        <group delimiter=", ">
          <text variable="title" text-case="title"/>
          <names variable="author">
            <name initialize-with="." form="short" delimiter="-"/>
          </names>
        </group>
      </if>
      <else-if type="patent" variable="number" match="all">
        <text macro="patent-number" font-style="italic"/>
      </else-if>
      <else-if variable="title">
        <choose>
          <if variable="version" type="book" match="all">
            <!---This is a hack until we have a software type -->
            <text variable="title"/>
          </if>
          <else-if variable="reviewed-author reviewed-title" type="review review-book" match="any">
            <choose>
              <if variable="reviewed-title">
                <choose>
                  <if type="post post-weblog webpage" variable="container-title" match="any">
                    <text variable="title"/>
                  </if>
                  <else>
                    <text variable="title" font-style="italic"/>
                  </else>
                </choose>
              </if>
            </choose>
          </else-if>
          <else-if type="post post-weblog webpage" variable="container-title" match="any">
            <text variable="title"/>
          </else-if>
          <else>
            <text variable="title" font-style="italic"/>
          </else>
        </choose>
      </else-if>
      <else-if variable="interviewer" type="interview" match="any">
        <names variable="interviewer">
          <label form="verb-short" suffix=" " text-case="capitalize-first"/>
          <name and="symbol" initialize-with=". " delimiter=", "/>
        </names>
      </else-if>
    </choose>
  </macro>
  <!-- APA has four descriptive sections following the title: -->
  <!-- (description), [format], container, event -->
  <macro name="description">
    <group prefix="(" suffix=")">
      <choose>
        <!-- book is here to catch software with container titles -->
        <if type="book report" match="any">
          <choose>
            <if variable="container-title">
              <text macro="secondary-contributors"/>
            </if>
            <else>
              <group delimiter="; ">
                <text macro="description-report"/>
                <text macro="secondary-contributors"/>
              </group>
            </else>
          </choose>
        </if>
        <else-if type="thesis">
          <group delimiter="; ">
            <group delimiter=", ">
              <text variable="genre" text-case="capitalize-first"/>
              <choose>
                <!-- In APA journals, the university of a thesis is always cited, even if another locator is given -->
                <if variable="DOI URL archive" match="any">
                  <text variable="publisher"/>
                </if>
              </choose>
            </group>
            <text macro="locators"/>
            <text macro="secondary-contributors"/>
          </group>
        </else-if>
        <else-if type="book interview manuscript motion_picture musical_score pamphlet post-weblog speech webpage" match="any">
          <group delimiter="; ">
            <text macro="locators"/>
            <text macro="secondary-contributors"/>
          </group>
        </else-if>
        <else-if type="song">
          <choose>
            <if variable="container-title" match="none">
              <text macro="locators"/>
            </if>
          </choose>
        </else-if>
        <else-if type="article dataset figure" match="any">
          <choose>
            <if variable="container-title">
              <text macro="secondary-contributors"/>
            </if>
            <else>
              <group delimiter="; ">
                <text macro="locators"/>
                <text macro="secondary-contributors"/>
              </group>
            </else>
          </choose>
        </else-if>
        <else-if type="bill legislation legal_case patent treaty personal_communication" match="none">
          <text macro="secondary-contributors"/>
        </else-if>
      </choose>
    </group>
  </macro>
  <macro name="format">
    <group prefix="[" suffix="]">
      <choose>
        <if variable="reviewed-author reviewed-title" type="review review-book" match="any">
          <group delimiter=", ">
            <choose>
              <if variable="genre">
                <!-- Delimiting by , rather than "of" to avoid incorrect grammar -->
                <group delimiter=", ">
                  <text variable="genre" text-case="capitalize-first"/>
                  <choose>
                    <if variable="reviewed-title">
                      <text variable="reviewed-title" font-style="italic"/>
                    </if>
                    <else>
                      <text variable="title" font-style="italic"/>
                    </else>
                  </choose>
                </group>
              </if>
              <else>
                <!-- This should be localized -->
                <group delimiter=" ">
                  <text value="Review of"/>
                  <choose>
                    <if variable="reviewed-title">
                      <text variable="reviewed-title" font-style="italic"/>
                    </if>
                    <else>
                      <text variable="title" font-style="italic"/>
                    </else>
                  </choose>
                </group>
              </else>
            </choose>
            <names variable="reviewed-author">
              <label form="verb-short" suffix=" "/>
              <name and="symbol" initialize-with=". " delimiter=", "/>
            </names>
          </group>
        </if>
        <else>
          <text macro="format-short"/>
        </else>
      </choose>
    </group>
  </macro>
  <macro name="format-short">
    <choose>
      <if variable="reviewed-author reviewed-title" type="review review-book" match="any">
        <choose>
          <if variable="reviewed-title" match="none">
            <choose>
              <if variable="genre">
                <!-- Delimiting by , rather than "of" to avoid incorrect grammar -->
                <group delimiter=", ">
                  <text variable="genre" text-case="capitalize-first"/>
                  <text variable="title" form="short" text-case="title" font-style="italic"/>
                </group>
              </if>
              <else>
                <!-- This should be localized -->
                <group delimiter=" ">
                  <text value="Review of"/>
                  <text variable="title" form="short" text-case="title" font-style="italic"/>
                </group>
              </else>
            </choose>
          </if>
          <else>
            <text variable="title" form="short" text-case="title" quotes="true"/>
          </else>
        </choose>
      </if>
      <else-if type="speech thesis" match="any">
        <text variable="medium" text-case="capitalize-first"/>
      </else-if>
      <!-- book is here to catch software with container titles -->
      <else-if type="book report" match="any">
        <choose>
          <if variable="container-title" match="none">
            <text macro="format-report"/>
          </if>
        </choose>
      </else-if>
      <else-if type="manuscript pamphlet" match="any">
        <text variable="medium" text-case="capitalize-first"/>
      </else-if>
      <else-if type="personal_communication">
        <text macro="secondary-contributors"/>
      </else-if>
      <else-if type="song">
        <group delimiter="; ">
          <text macro="secondary-contributors"/>
          <choose>
            <if variable="container-title" match="none">
              <group delimiter=", ">
                <text variable="genre" text-case="capitalize-first"/>
                <text variable="medium" text-case="capitalize-first"/>
              </group>
            </if>
          </choose>
        </group>
      </else-if>
      <else-if type="paper-conference">
        <group delimiter=", ">
          <choose>
            <if variable="collection-editor editor issue page volume" match="any">
              <text variable="genre" text-case="capitalize-first"/>
            </if>
          </choose>
          <text variable="medium" text-case="capitalize-first"/>
        </group>
      </else-if>
      <else-if type="bill legislation legal_case patent treaty" match="none">
        <choose>
          <if variable="genre medium" match="any">
            <group delimiter=", ">
              <text variable="genre" text-case="capitalize-first"/>
              <text variable="medium" text-case="capitalize-first"/>
            </group>
          </if>
          <else-if type="dataset">
            <!-- This should be localized -->
            <text value="Data set"/>
          </else-if>
        </choose>
      </else-if>
    </choose>
  </macro>
  <macro name="description-report">
    <choose>
      <if variable="number">
        <group delimiter="; ">
          <group delimiter=" ">
            <text variable="genre" text-case="title"/>
            <!-- Replace with term="number" if that becomes available -->
            <text term="issue" form="short" text-case="capitalize-first"/>
            <text variable="number"/>
          </group>
          <text macro="locators"/>
        </group>
      </if>
      <else>
        <text macro="locators"/>
      </else>
    </choose>
  </macro>
  <macro name="format-report">
    <choose>
      <if variable="number">
        <text variable="medium" text-case="capitalize-first"/>
      </if>
      <else>
        <group delimiter=", ">
          <text variable="genre" text-case="capitalize-first"/>
          <text variable="medium" text-case="capitalize-first"/>
        </group>
      </else>
    </choose>
  </macro>
  <macro name="title-and-descriptions">
    <group delimiter=" ">
      <text macro="title"/>
      <choose>
        <if variable="title interviewer" type="interview" match="any">
          <group delimiter=" ">
            <text macro="description"/>
            <text macro="format"/>
          </group>
        </if>
        <else>
          <group delimiter=" ">
            <text macro="format"/>
            <text macro="description"/>
          </group>
        </else>
      </choose>
    </group>
  </macro>
  <macro name="archive">
    <group delimiter=". ">
      <group delimiter=", ">
        <choose>
          <if type="manuscript">
            <text variable="genre"/>
          </if>
        </choose>
        <group delimiter=" ">
          <!-- Replace "archive" with "archive_collection" as that becomes available -->
          <text variable="archive"/>
          <text variable="archive_location" prefix="(" suffix=")"/>
        </group>
      </group>
      <group delimiter=", ">
        <!-- Move "archive" here when "archive_collection" becomes available -->
        <text variable="archive-place"/>
      </group>
    </group>
  </macro>
  <macro name="publisher">
    <choose>
      <if type="manuscript pamphlet" match="any">
        <choose>
          <if variable="archive archive_location archive-place" match="any">
            <group delimiter=". ">
              <group delimiter=": ">
                <text variable="publisher-place"/>
                <text variable="publisher"/>
              </group>
              <text macro="archive"/>
            </group>
          </if>
          <else>
            <group delimiter=", ">
              <text variable="genre"/>
              <text variable="publisher"/>
              <text variable="publisher-place"/>
            </group>
          </else>
        </choose>
      </if>
      <else-if type="thesis" match="any">
        <group delimiter=". ">
          <group delimiter=", ">
            <text variable="publisher"/>
            <text variable="publisher-place"/>
          </group>
          <text macro="archive"/>
        </group>
      </else-if>
      <else-if type="patent">
        <group delimiter=". ">
          <group delimiter=": ">
            <text variable="publisher-place"/>
            <text variable="publisher"/>
          </group>
          <text macro="archive"/>
        </group>
      </else-if>
      <else-if type="article-journal article-magazine article-newspaper" match="any">
        <text macro="archive"/>
      </else-if>
      <else-if type="post post-weblog webpage" match="none">
        <group delimiter=". ">
          <choose>
            <if variable="event">
              <choose>
                <!-- Only print publisher info if published in a proceedings -->
                <if variable="collection-editor editor issue page volume" match="any">
                  <group delimiter=": ">
                    <text variable="publisher-place"/>
                    <text variable="publisher"/>
                  </group>
                </if>
              </choose>
            </if>
            <else>
              <group delimiter=": ">
                <text variable="publisher-place"/>
                <text variable="publisher"/>
              </group>
            </else>
          </choose>
          <text macro="archive"/>
        </group>
      </else-if>
    </choose>
  </macro>
  <macro name="event">
    <choose>
      <if variable="event" type="speech paper-conference" match="any">
        <choose>
          <!-- Don't print event info if published in a proceedings -->
          <if variable="collection-editor editor issue page volume" match="none">
            <group delimiter=" ">
              <text variable="genre" text-case="capitalize-first"/>
              <group delimiter=" ">
                <choose>
                  <if variable="genre">
                    <text term="presented at"/>
                  </if>
                  <else>
                    <text term="presented at" text-case="capitalize-first"/>
                  </else>
                </choose>
                <group delimiter=", ">
                  <text variable="event"/>
                  <text variable="event-place"/>
                </group>
              </group>
            </group>
          </if>
        </choose>
      </if>
    </choose>
  </macro>
  <macro name="issued">
    <choose>
      <if type="bill legal_case legislation" match="any"/>
      <else-if variable="issued">
        <group>
          <date variable="issued">
            <date-part name="year"/>
          </date>
          <text variable="year-suffix"/>
          <choose>
            <if type="speech">
              <date variable="issued" delimiter=" ">
                <date-part prefix=", " name="month"/>
              </date>
            </if>
            <else-if type="article article-magazine article-newspaper broadcast interview pamphlet personal_communication post post-weblog treaty webpage" match="any">
              <date variable="issued">
                <date-part prefix=", " name="month"/>
                <date-part prefix=" " name="day"/>
              </date>
            </else-if>
            <else-if type="paper-conference">
              <choose>
                <if variable="container-title" match="none">
                  <date variable="issued">
                    <date-part prefix=", " name="month"/>
                    <date-part prefix=" " name="day"/>
                  </date>
                </if>
              </choose>
            </else-if>
            <!-- Only year: article-journal chapter entry entry-dictionary entry-encyclopedia dataset figure graphic motion_picture manuscript map musical_score paper-conference [published] patent report review review-book song thesis -->
          </choose>
        </group>
      </else-if>
      <else-if variable="status">
        <group>
          <text variable="status" text-case="lowercase"/>
          <text variable="year-suffix" prefix="-"/>
        </group>
      </else-if>
      <else>
        <group>
          <text term="no date" form="short"/>
          <text variable="year-suffix" prefix="-"/>
        </group>
      </else>
    </choose>
  </macro>
  <macro name="issued-sort">
    <choose>
      <if type="article article-magazine article-newspaper broadcast interview pamphlet personal_communication post post-weblog speech treaty webpage" match="any">
        <date variable="issued">
          <date-part name="year"/>
          <date-part name="month"/>
          <date-part name="day"/>
        </date>
      </if>
      <else>
        <date variable="issued">
          <date-part name="year"/>
        </date>
      </else>
    </choose>
  </macro>
  <macro name="issued-year">
    <group>
      <choose>
        <if type="personal_communication">
          <choose>
            <if variable="archive DOI publisher URL" match="none">
              <!-- These variables indicate that the letter is retrievable by the reader. If not, then use the APA in-text-only personal communication format -->
              <date variable="issued" form="text"/>
            </if>
            <else>
              <date variable="issued">
                <date-part name="year"/>
              </date>
            </else>
          </choose>
        </if>
        <else>
          <date variable="issued">
            <date-part name="year"/>
          </date>
        </else>
      </choose>
      <text variable="year-suffix"/>
    </group>
  </macro>
  <macro name="issued-citation">
    <choose>
      <if variable="issued">
        <group delimiter="/">
          <choose>
            <if is-uncertain-date="original-date">
              <group prefix="[" suffix="]" delimiter=" ">
                <text term="circa" form="short"/>
                <date variable="original-date">
                  <date-part name="year"/>
                </date>
              </group>
            </if>
            <else>
              <date variable="original-date">
                <date-part name="year"/>
              </date>
            </else>
          </choose>
          <choose>
            <if is-uncertain-date="issued">
              <group prefix="[" suffix="]" delimiter=" ">
                <text term="circa" form="short"/>
                <text macro="issued-year"/>
              </group>
            </if>
            <else>
              <text macro="issued-year"/>
            </else>
          </choose>
        </group>
      </if>
      <else-if variable="status">
        <text variable="status" text-case="lowercase"/>
        <text variable="year-suffix" prefix="-"/>
      </else-if>
      <else>
        <text term="no date" form="short"/>
        <text variable="year-suffix" prefix="-"/>
      </else>
    </choose>
  </macro>
  <macro name="original-date">
    <choose>
      <if type="bill legal_case legislation" match="any"/>
      <else-if type="speech">
        <date variable="original-date" delimiter=" ">
          <date-part name="month"/>
          <date-part name="year"/>
        </date>
      </else-if>
      <else-if type="article article-magazine article-newspaper broadcast interview pamphlet personal_communication post post-weblog treaty webpage" match="any">
        <date variable="original-date" form="text"/>
      </else-if>
      <else>
        <date variable="original-date">
          <date-part name="year"/>
        </date>
      </else>
    </choose>
  </macro>
  <macro name="original-published">
    <!--This should be localized -->
    <choose>
      <if type="bill legal_case legislation" match="any"/>
      <else-if type="interview motion_picture song" match="any">
        <text value="Original work recorded"/>
      </else-if>
      <else-if type="broadcast">
        <text value="Original work broadcast"/>
      </else-if>
      <else>
        <text value="Original work published"/>
      </else>
    </choose>
  </macro>
  <macro name="edition">
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
  </macro>
  <macro name="locators">
    <choose>
      <if type="article-journal article-magazine figure review review-book" match="any">
        <group delimiter=", ">
          <group>
            <text variable="volume" font-style="italic"/>
            <text variable="issue" prefix="(" suffix=")"/>
          </group>
          <text variable="page"/>
        </group>
      </if>
      <else-if type="article-newspaper">
        <group delimiter=" ">
          <label variable="page" form="short"/>
          <text variable="page"/>
        </group>
      </else-if>
      <else-if type="paper-conference">
        <choose>
          <if variable="collection-editor editor" match="any">
            <text macro="locators-booklike"/>
          </if>
          <else>
            <group delimiter=", ">
              <group>
                <text variable="volume" font-style="italic"/>
                <text variable="issue" prefix="(" suffix=")"/>
              </group>
              <text variable="page"/>
            </group>
          </else>
        </choose>
      </else-if>
      <else-if type="bill broadcast interview legal_case legislation patent post post-weblog speech treaty webpage" match="none">
        <text macro="locators-booklike"/>
      </else-if>
    </choose>
  </macro>
  <macro name="locators-booklike">
    <group delimiter=", ">
      <text macro="edition"/>
      <group delimiter=" ">
        <text term="version" text-case="capitalize-first"/>
        <text variable="version"/>
      </group>
      <choose>
        <if variable="volume" match="any">
          <choose>
            <if is-numeric="volume" match="none"/>
            <else-if variable="collection-title">
              <choose>
                <if variable="editor translator" match="none">
                  <choose>
                    <if variable="collection-number">
                      <group>
                        <text term="volume" form="short" text-case="capitalize-first" suffix=" "/>
                        <number variable="volume" form="numeric"/>
                      </group>
                    </if>
                  </choose>
                </if>
              </choose>
            </else-if>
            <else>
              <group>
                <text term="volume" form="short" text-case="capitalize-first" suffix=" "/>
                <number variable="volume" form="numeric"/>
              </group>
            </else>
          </choose>
        </if>
        <else>
          <group>
            <text term="volume" form="short" plural="true" text-case="capitalize-first" suffix=" "/>
            <number variable="number-of-volumes" form="numeric" prefix="1&#8211;"/>
          </group>
        </else>
      </choose>
      <group>
        <label variable="page" form="short" suffix=" "/>
        <text variable="page"/>
      </group>
    </group>
  </macro>
  <macro name="citation-locator">
    <group>
      <choose>
        <if locator="chapter">
          <label variable="locator" text-case="capitalize-first"/>
        </if>
        <else>
          <label variable="locator" form="short"/>
        </else>
      </choose>
      <text variable="locator" prefix=" "/>
    </group>
  </macro>
  <macro name="container">
    <choose>
      <if type="article article-journal article-magazine article-newspaper review review-book" match="any">
        <group delimiter=", ">
          <text macro="container-title"/>
          <text macro="locators"/>
        </group>
        <choose>
          <!--for advance online publication-->
          <if variable="issued">
            <choose>
              <if variable="page issue" match="none">
                <text variable="status" text-case="capitalize-first" prefix=". "/>
              </if>
            </choose>
          </if>
        </choose>
      </if>
      <else-if type="article dataset figure" match="any">
        <choose>
          <if variable="container-title">
            <group delimiter=", ">
              <text macro="container-title"/>
              <text macro="locators"/>
            </group>
            <choose>
              <!--for advance online publication-->
              <if variable="issued">
                <choose>
                  <if variable="page issue" match="none">
                    <text variable="status" text-case="capitalize-first" prefix=". "/>
                  </if>
                </choose>
              </if>
            </choose>
          </if>
        </choose>
      </else-if>
      <!-- book is here to catch software with container titles -->
      <else-if type="book" variable="container-title" match="all">
        <group delimiter=" ">
          <text term="in" text-case="capitalize-first" suffix=" "/>
          <group delimiter=", ">
            <text macro="container-contributors"/>
            <group delimiter=" ">
              <text macro="container-title"/>
              <text macro="description-report" prefix="(" suffix=")"/>
              <text macro="format-report" prefix="[" suffix="]"/>
            </group>
          </group>
        </group>
      </else-if>
      <else-if type="report" variable="container-title" match="all">
        <group delimiter=" ">
          <text term="in" text-case="capitalize-first" suffix=" "/>
          <group delimiter=", ">
            <text macro="container-contributors"/>
            <group delimiter=" ">
              <text macro="container-title"/>
              <text macro="description-report" prefix="(" suffix=")"/>
              <text macro="format-report" prefix="[" suffix="]"/>
            </group>
          </group>
        </group>
      </else-if>
      <else-if type="song" variable="container-title" match="all">
        <group delimiter=" ">
          <text term="in" text-case="capitalize-first" suffix=" "/>
          <group delimiter=", ">
            <text macro="container-contributors"/>
            <group delimiter=" ">
              <text macro="container-title"/>
              <text macro="locators" prefix="(" suffix=")"/>
              <group delimiter=", " prefix="[" suffix="]">
                <text variable="genre" text-case="capitalize-first"/>
                <text variable="medium" text-case="capitalize-first"/>
              </group>
            </group>
          </group>
        </group>
      </else-if>
      <else-if type="paper-conference">
        <choose>
          <if variable="editor collection-editor container-author" match="any">
            <text macro="container-booklike"/>
          </if>
          <else>
            <group delimiter=", ">
              <text macro="container-title"/>
              <text macro="locators"/>
            </group>
          </else>
        </choose>
      </else-if>
      <else-if type="book">
        <choose>
          <!-- book and software should not cite collection-title, only container-title -->
          <if variable="container-title">
            <text macro="container-booklike"/>
          </if>
        </choose>
      </else-if>
      <else-if type="broadcast chapter entry entry-dictionary entry-encyclopedia graphic map speech" match="any">
        <text macro="container-booklike"/>
      </else-if>
      <else-if type="bill legal_case legislation treaty" match="any">
        <text macro="legal-cites"/>
      </else-if>
    </choose>
  </macro>
  <macro name="container-booklike">
    <choose>
      <if variable="container-title collection-title" match="any">
        <group delimiter=" ">
          <text term="in" text-case="capitalize-first"/>
          <group delimiter=", ">
            <text macro="container-contributors"/>
            <choose>
              <if variable="container-author editor translator" match="none">
                <group delimiter=". ">
                  <group delimiter=": ">
                    <text variable="collection-title" font-style="italic" text-case="title"/>
                    <choose>
                      <if variable="collection-title">
                        <group delimiter=" ">
                          <text term="volume" form="short" font-style="italic" text-case="capitalize-first"/>
                          <number variable="collection-number" font-style="italic" form="numeric"/>
                          <choose>
                            <if variable="collection-number" match="none">
                              <number variable="volume" font-style="italic" form="numeric"/>
                            </if>
                          </choose>
                        </group>
                      </if>
                    </choose>
                  </group>
                  <!-- Replace with volume-title as that becomes available -->
                  <group delimiter=": ">
                    <text macro="container-title"/>
                    <choose>
                      <if variable="collection-title" is-numeric="volume" match="none">
                        <group delimiter=" ">
                          <text term="volume" form="short" font-style="italic" text-case="capitalize-first"/>
                          <text variable="volume" font-style="italic"/>
                        </group>
                      </if>
                    </choose>
                  </group>
                </group>
              </if>
              <else>
                <!-- Replace with volume-title as that becomes available -->
                <group delimiter=": ">
                  <text macro="container-title"/>
                  <choose>
                    <if is-numeric="volume" match="none">
                      <group delimiter=" ">
                        <text term="volume" form="short" font-style="italic" text-case="capitalize-first"/>
                        <text variable="volume" font-style="italic"/>
                      </group>
                    </if>
                  </choose>
                </group>
              </else>
            </choose>
          </group>
          <group delimiter="; " prefix="(" suffix=")">
            <text macro="locators"/>
            <names variable="container-author">
              <label form="verb-short" suffix=" " text-case="title"/>
              <name and="symbol" initialize-with=". " delimiter=", "/>
            </names>
          </group>
        </group>
      </if>
    </choose>
  </macro>
  <macro name="container-title">
    <choose>
      <if type="article article-journal article-magazine article-newspaper dataset" match="any">
        <text variable="container-title" font-style="italic" text-case="title"/>
      </if>
      <else-if type="paper-conference speech" match="any">
        <choose>
          <if variable="collection-editor container-author editor" match="any">
            <text variable="container-title" font-style="italic"/>
          </if>
          <else>
            <text variable="container-title" font-style="italic" text-case="title"/>
          </else>
        </choose>
      </else-if>
      <else-if type="bill legal_case legislation post-weblog webpage" match="none">
        <text variable="container-title" font-style="italic"/>
      </else-if>
    </choose>
  </macro>
  <!-- After 'source', APA also prints publication history (original publication, reprint info, retraction info) -->
  <macro name="publication-history">
    <choose>
      <if type="patent" match="none">
        <group prefix="(" suffix=")">
          <choose>
            <if variable="references">
              <!-- This provides the option for more elaborate description 
                   of publication history, such as full "reprinted" references
                   (example 26) or retracted references -->
              <text variable="references"/>
            </if>
            <else>
              <choose>
                <if variable="original-date">
                  <group delimiter=" ">
                    <text macro="original-published"/>
                    <choose>
                      <if is-uncertain-date="original-date">
                        <group prefix="[" suffix="]" delimiter=" ">
                          <text term="circa" form="short"/>
                          <text macro="original-date"/>
                        </group>
                      </if>
                      <else>
                        <text macro="original-date"/>
                      </else>
                    </choose>
                  </group>
                </if>
              </choose>
            </else>
          </choose>
        </group>
      </if>
      <else>
        <text variable="references" prefix="(" suffix=")"/>
      </else>
    </choose>
  </macro>
  <macro name="legal-cites">
    <choose>
      <if type="legal_case">
        <group prefix=", " delimiter=" ">
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
                <group delimiter=" ">
                  <choose>
                    <if is-numeric="number">
                      <!-- Replace with term="number" if that becomes available -->
                      <text term="issue" form="short" text-case="capitalize-first"/>
                    </if>
                  </choose>
                  <text variable="number"/>
                </group>
              </else>
            </choose>
          </group>
          <group prefix="(" suffix=")" delimiter=" ">
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
        </group>
      </if>
      <else-if type="bill legislation" match="any">
        <group prefix=", " delimiter=" ">
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
          <date variable="issued" prefix="(" suffix=")">
            <date-part name="year"/>
          </date>
        </group>
      </else-if>
      <else-if type="treaty">
        <group delimiter=" ">
          <number variable="volume"/>
          <text variable="container-title"/>
          <text variable="page"/>
        </group>
      </else-if>
    </choose>
  </macro>
  <citation et-al-min="6" et-al-use-first="1" et-al-subsequent-min="3" et-al-subsequent-use-first="1" disambiguate-add-year-suffix="true" disambiguate-add-names="true" disambiguate-add-givenname="true" collapse="year" givenname-disambiguation-rule="primary-name">
    <sort>
      <key macro="author" names-min="8" names-use-first="6"/>
      <key macro="issued-sort"/>
    </sort>
    <layout prefix="(" suffix=")" delimiter="; ">
      <group delimiter=", ">
        <text macro="author-short"/>
        <text macro="issued-citation"/>
        <text macro="citation-locator"/>
      </group>
    </layout>
  </citation>
  <bibliography hanging-indent="true" et-al-min="8" et-al-use-first="6" et-al-use-last="true" entry-spacing="0" line-spacing="2">
    <sort>
      <key macro="author"/>
      <key macro="issued-sort" sort="ascending"/>
      <key macro="title"/>
    </sort>
    <layout>
      <group delimiter=" ">
        <group delimiter=". " suffix=".">
          <text macro="author"/>
          <choose>
            <if is-uncertain-date="issued">
              <group prefix="[" suffix="]" delimiter=" ">
                <text term="circa" form="short"/>
                <text macro="issued"/>
              </group>
            </if>
            <else>
              <text macro="issued" prefix="(" suffix=")"/>
            </else>
          </choose>
          <text macro="title-and-descriptions"/>
          <text macro="container"/>
          <text macro="event"/>
          <text macro="publisher"/>
        </group>
        <text macro="access"/>
        <text macro="publication-history"/>
      </group>
    </layout>
  </bibliography>
</style>`;
export const getTemplate =  ((type) => {

  if(type === 'Chicago') {
      return CHICAGO_TEMPLATE;
  }
  if(type === 'MLA') {
    return MLA_TEMPLATE;
}
if(type==="APA")
{
  return APA_TEMPLATE;
}
  });