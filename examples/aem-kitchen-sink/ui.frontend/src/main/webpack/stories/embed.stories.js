import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Embed',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/embed';

export const URL = () => ({
  content: {
    "type": "URL",
    "url": "https://www.pinterest.com/pin/146859637829777606/",
    "result": {
      "processor": "pinterest",
      "options": {
        "pinId": "146859637829777606"
      }
    },
    ":type": "core/wcm/components/embed/v1/embed"
  },
  resourceType: resourceType,
});


export const oEmbedURL = () => ({
  content: {
    "type": "URL",
    "url": "https://twitter.com/GabrielWalt/status/1159514156074196992",
    "result": {
      "processor": "oembed",
      "options": {
        "provider": "Twitter",
        "response": {
          "type": "rich",
          "version": "1.0",
          "title": null,
          "authorName": "Gabriel Walt",
          "authorUrl": "https://twitter.com/GabrielWalt",
          "providerName": "Twitter",
          "providerUrl": "https://twitter.com",
          "cacheAge": 3153600000,
          "thumbnailUrl": null,
          "thumbnailWidth": null,
          "thumbnailHeight": null,
          "width": "550",
          "height": null,
          "html": "<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">New <a href=\"https://twitter.com/hashtag/AEM?src=hash&amp;ref_src=twsrc%5Etfw\">#AEM</a> Project Archetype 20 got released!<br>It features a frontend build process based on <a href=\"https://twitter.com/webpack?ref_src=twsrc%5Etfw\">@Webpack</a>, with <a href=\"https://twitter.com/SassCSS?ref_src=twsrc%5Etfw\">@SassCSS</a> and <a href=\"https://twitter.com/typescript?ref_src=twsrc%5Etfw\">@TypeScript</a>. You can customize it to use any tool: no more ClientLib limitations.<a href=\"https://t.co/ivjNtiZkXi\">https://t.co/ivjNtiZkXi</a><a href=\"https://twitter.com/hashtag/CoreCmp?src=hash&amp;ref_src=twsrc%5Etfw\">#CoreCmp</a> <a href=\"https://twitter.com/hashtag/Adobe?src=hash&amp;ref_src=twsrc%5Etfw\">#Adobe</a> <a href=\"https://twitter.com/hashtag/ExperienceManager?src=hash&amp;ref_src=twsrc%5Etfw\">#ExperienceManager</a> <a href=\"https://twitter.com/hashtag/AEM6?src=hash&amp;ref_src=twsrc%5Etfw\">#AEM6</a> <a href=\"https://twitter.com/hashtag/CSS?src=hash&amp;ref_src=twsrc%5Etfw\">#CSS</a> <a href=\"https://twitter.com/hashtag/JS?src=hash&amp;ref_src=twsrc%5Etfw\">#JS</a> <a href=\"https://t.co/Cy3FdRCNvg\">pic.twitter.com/Cy3FdRCNvg</a></p>&mdash; Gabriel Walt (@GabrielWalt) <a href=\"https://twitter.com/GabrielWalt/status/1159514156074196992?ref_src=twsrc%5Etfw\">August 8, 2019</a></blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n",
          "url": "https://twitter.com/GabrielWalt/status/1159514156074196992"
        },
        "unsafeContext": true
      }
    },
    ":type": "core/wcm/components/embed/v1/embed"
  },
  resourceType: resourceType,
});

export const Embeddable = () => ({
  content: {
    "type": "EMBEDDABLE",
    "embeddableResourceType": "core/wcm/components/embed/v1/embed/embeddable/youtube",
    ":type": "core/wcm/components/embed/v1/embed"
  },
  resourceType: resourceType,
});

export const HTML = () => ({
  content: {
    "type": "HTML",
    "html": "<blockquote>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</blockquote>",
    ":type": "core/wcm/components/embed/v1/embed"
  },
  resourceType: resourceType,
});