<%@page session="false"%><%--

  ADOBE CONFIDENTIAL
  __________________

   Copyright 2011 Adobe Systems Incorporated
   All Rights Reserved.

  NOTICE:  All information contained herein is, and remains
  the property of Adobe Systems Incorporated and its suppliers,
  if any.  The intellectual and technical concepts contained
  herein are proprietary to Adobe Systems Incorporated and its
  suppliers and are protected by trade secret or copyright law.
  Dissemination of this information or reproduction of this material
  is strictly forbidden unless prior written permission is obtained
  from Adobe Systems Incorporated.
  --%><%
%><%@include file="/libs/foundation/global.jsp" %><%
%><%@page import="java.util.List,
                                   com.day.cq.wcm.webservicesupport.ServiceLibFinder"%><%
/** 
 * Note: 
 * headLibs do not support service indirection (i.e. TagManager) where service configurations
 * are nested within another service.
 */ 
ServiceLibFinder slf = sling.getService(ServiceLibFinder.class);
List<String> libsScripts = slf.getScriptPaths(pageProperties.getInherited("cq:cloudserviceconfigs", new String[] {}));
for (String script : libsScripts) {
    %><cq:include script="<%=script%>"/><%
}

%>
