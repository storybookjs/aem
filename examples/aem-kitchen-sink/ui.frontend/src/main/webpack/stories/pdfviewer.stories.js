import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/PDF Viewer',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/pdfviewer';

export const FullWindow = () => ({
  content: {
    "id": "pdfviewer-97a46bd902",
    "documentPath": "/content/dam/core-components-examples/library/sample-assets/Bodea Brochure.pdf",
    "type": "FULL_WINDOW",
    "defaultViewMode": "FIT_PAGE",
    "borderless": false,
    "showAnnotationTools": false,
    "showFullScreen": true,
    "showLeftHandPanel": true,
    "showDownloadPdf": true,
    "showPrintPdf": true,
    "showPageControls": true,
    "dockPageControls": true,
    "clientId": "28b07c6be4d544f188dc2f36e33b196b",
    "documentFileName": "Bodea Brochure.pdf",
    "viewerConfigJson": "{\"embedMode\":\"FULL_WINDOW\",\"defaultViewMode\":\"FIT_PAGE\",\"showAnnotationTools\":false,\"showLeftHandPanel\":true,\"showPageControls\":true,\"dockPageControls\":true,\"showDownloadPDF\":true,\"showPrintPDF\":true}",
    "containerClass": "cmp-pdfviewer__full-window",
    "reportSuiteId": "",
    ":type": "core-components-examples/components/pdfviewer",
    "dataLayer": {
      "pdfviewer-97a46bd902": {
        "repo:modifyDate": "2020-04-30T00:10:55Z",
        "@type": "core-components-examples/components/pdfviewer"
      }
    }
  },
  resourceType: resourceType,
});

export const SizedContainer = () => ({
  content: {
    "id": "pdfviewer-c5f6662102",
    "documentPath": "/content/dam/core-components-examples/library/sample-assets/Bodea Brochure.pdf",
    "type": "SIZED_CONTAINER",
    "defaultViewMode": "FIT_PAGE",
    "borderless": false,
    "showAnnotationTools": false,
    "showFullScreen": false,
    "showLeftHandPanel": true,
    "showDownloadPdf": true,
    "showPrintPdf": true,
    "showPageControls": false,
    "dockPageControls": false,
    "clientId": "28b07c6be4d544f188dc2f36e33b196b",
    "documentFileName": "Bodea Brochure.pdf",
    "viewerConfigJson": "{\"embedMode\":\"SIZED_CONTAINER\",\"showFullScreen\":false,\"showPageControls\":false,\"dockPageControls\":false,\"showDownloadPDF\":true,\"showPrintPDF\":true}",
    "containerClass": "cmp-pdfviewer__sized-container",
    "reportSuiteId": "",
    ":type": "core-components-examples/components/pdfviewer",
    "dataLayer": {
      "pdfviewer-c5f6662102": {
        "repo:modifyDate": "2020-04-30T00:11:46Z",
        "@type": "core-components-examples/components/pdfviewer"
      }
    }
  },
  resourceType: resourceType,
});

export const Inline = () => ({
  content: {
    "id": "pdfviewer-98746e7e01",
    "documentPath": "/content/dam/core-components-examples/library/sample-assets/Bodea Brochure.pdf",
    "type": "IN_LINE",
    "defaultViewMode": "FIT_PAGE",
    "borderless": false,
    "showAnnotationTools": false,
    "showFullScreen": true,
    "showLeftHandPanel": true,
    "showDownloadPdf": true,
    "showPrintPdf": true,
    "showPageControls": true,
    "dockPageControls": true,
    "clientId": "28b07c6be4d544f188dc2f36e33b196b",
    "documentFileName": "Bodea Brochure.pdf",
    "viewerConfigJson": "{\"embedMode\":\"IN_LINE\",\"showDownloadPDF\":true,\"showPrintPDF\":true}",
    "containerClass": "cmp-pdfviewer__in-line",
    "reportSuiteId": "",
    ":type": "core-components-examples/components/pdfviewer",
    "dataLayer": {
      "pdfviewer-98746e7e01": {
        "repo:modifyDate": "2020-04-30T00:12:31Z",
        "@type": "core-components-examples/components/pdfviewer"
      }
    }
  },
  resourceType: resourceType,
});