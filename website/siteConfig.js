/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'ADM Purdue',
    image: '/isoblue-site/img/abe.gif',
    infoLink: 'https://engineering.purdue.edu/ABE/research/facilities',
    pinned: true,
  },
  {
    caption: 'ECE Purdue',
    image: '/isoblue-site/img/ece.gif',
    infoLink: 'https://engineering.purdue.edu/ECE',
    pinned: true,
  },
];

const siteConfig = {
  title: 'ISOBlue 2.0' /* title for your website */,
  tagline: 'Free the Ag Machinery Data',
  url: 'https://isoblue.org' /* your website url */,
  baseUrl: '/isoblue-site/' /* base url for your project */,
  projectName: 'isoblue-site',
  headerLinks: [
    {doc: 'bom', label: 'Docs'},
    {blog: true, label: 'Blog'},
    {href: 'https://github.com/ISOBlue', label: 'Github'},
		{href: 'https://groups.google.com/forum/?fromgroups#!forum/isoblue', label: 'Mailing List'},
		{href: 'http://cloudradio39.ecn.purdue.edu/', label: 'Public Data'},
    {page: 'help', label: 'Help'}
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/oats_logo.png',
  footerIcon: 'img/docusaurus.svg',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#4080C0',
    secondaryColor: '#205C3B',
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    'Open Agricultural Systems Group',
  organizationName: 'ISOBlue', // or set an env variable ORGANIZATION_NAME
  projectName: 'isoblue.github.io', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/ISOBlue/',
};

module.exports = siteConfig;
