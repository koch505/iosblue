/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <Logo img_src={imgUrl('isoblue2.jpg')} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href={docUrl('bom.html', language)}>Hardware BOM</Button>
            <Button href={docUrl('build.html', language)}>Software Build Instructions</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="left" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = props => (
  <Block layout="fourColumn">
    {[
      {
        content:
					`Check our BOM and software build instructions to have your own
					ISOBlue 2.0 ready.`,
        image: imgUrl('build.png'),
        imageAlign: 'top',
        title: 'Easy to build',
      },
      {
        content:
					`The deployment only involves you to connect your ISOBlue 2.0
					to the machine once. It will take care of itself afterwards.`,
        image: imgUrl('deploy.png'),
        imageAlign: 'top',
        title: 'Easy to deploy',
      },
      {
        content:
					`With your favorite ag machinery connected, you can view your
					machine status on [where-is-my-isoblue](http://wheres-my-isoblue.oatsgroup.org/)
					and visualize real-time as-harvested data on
					[TrialsTracker](https://github.com/OpenATK/TrialsTracker).`,
        image: imgUrl('connected.png'),
        imageAlign: 'top',
        title: 'Connected Ag Machinery',
      },
      {
				content:
					`We backed up all of our data collected from ISOBlue 2.0's
					and our past Ag IoT. You can refer to this
					[tutorial](${siteConfig.baseUrl}docs/data.html)
					to find where you can download, read and play around with it.`,
        image: imgUrl('sharing.png'),
        imageAlign: 'top',
        title: 'Ag Machine Data Sharing',
      },
    ]}
  </Block>
);

const Description = props => (
  <Block background="light">
    {[
      {
        content:
					`ISOBlue 2.0 is OATS group's latest development for
					 collecting machine data as well as connecting ag machinery
					 to the Cloud. Using [Toradex's iMX6 platform](https://www.toradex.com/products)
					 and open source tools like [Apache Kafka](https://kafka.apache.org/)
					 we are able to stream process the collected data in real-time.`,
        image: imgUrl('wmi.gif'),
        imageAlign: 'right',
        title: 'ISOBlue 2.0',
      },
    ]}
  </Block>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"Who's Using This?"}</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <Description />
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
