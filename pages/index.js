import React, { useEffect } from 'react';

import Head from "next/head";
import Row from "../components/Row";
import Banner from "../components/Banner";
import Header from "../components/Header";

import HLSRow from "../components/HLSRow";

import getBingSourceEntries from "../lib/BingSource";
import getLifeTVSourceEntries from "../lib/LiveTVSource"
import getDirectoryEntries from "../lib/DirectorySource";

import getShowsEntries from "../lib/ShowSource";

export default function Home({
  photoEntries,
  liveTVEntries,
  trending,
  action,
  topRated,
  horror,
  comedy,
  romance,
  documentary,
}) {
  React.useEffect(() => {
      document.addEventListener('keyup', (e)=>{
        if (document.activeElement === null) return;

        if (e.key === 'ArrowLeft') {
          document.activeElement.previousElementSibling?.focus();
        } else if (e.key === 'ArrowRight') {
          document.activeElement.nextElementSibling?.focus();
        } else if (e.key === 'ArrowUp') {
          const currentMotionRow = document.activeElement.parentElement.parentElement;
          const prevMotionRow = currentMotionRow.previousElementSibling;
          if (prevMotionRow === null) return;
          const prevEntry = prevMotionRow.querySelector('.showEntry');
          prevEntry?.focus();
        } else if (e.key === 'ArrowDown') {
          const currentMotionRow = document.activeElement.parentElement.parentElement;
          const nextMotionRow = currentMotionRow.nextElementSibling;
          if (nextMotionRow === null) return;
          const nextEntry = nextMotionRow.querySelector('.showEntry');
          nextEntry?.focus();
        }
      })
  }, []);

  return (
    <div className="">
      <Head>
        <title>Netflix India - Watch TV Shows Online, Watch Movies Online</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter"
          rel="stylesheet"
        />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner entries={ photoEntries } />

      <div className="">
        <HLSRow title="Live TV" entries={liveTVEntries} />
        <Row id="trending" title="Trending" entries={trending} big={true} />
        <Row id="top" title="Top rated" entries={topRated} />
        <Row id="action" title="Action movies" entries={action} />
        <Row id="documentaries" title="Documentaries" entries={documentary} />
        <Row id="comedy" title="Comedy" entries={comedy} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const [
    bingEntries,
    menorcaEntries,
    liveTVEntries,
    showEntries 
  ] = await Promise.all([
      getBingSourceEntries(),
      getDirectoryEntries('/mnt/c/Users/ciber/photos/menorca_2017/', 'file:///c:/Users/ciber/photos/menorca_2017'),
      getLifeTVSourceEntries(),
      getShowsEntries()
  ]);

 return {
    props: {
      photoEntries : bingEntries,
      liveTVEntries,
      trending : showEntries.trending,
      action: showEntries.action,
      netflix : showEntries.netflix,
      topRated: showEntries.topRated,
      comedy : showEntries.comedy,
      documentary : showEntries.documentary
    },
  };
}