"use client"

import { useEffect } from "react";
import * as tocbot from "tocbot";
import Sidebar from "../molecules/sidebar";
import { faList } from "@fortawesome/free-solid-svg-icons";

export default function TableOfContents() {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc", 
      contentSelector: "#content", 
      headingSelector: "h1, h2, h3", 
      listClass: "toc-list",
      linkClass: "toc-link",
      activeLinkClass: "is-active",
      headingsOffset: 200,
      scrollSmoothOffset: -100,
      skipRendering: false,
    });

    return () => tocbot.destroy();
  }, []);

  return (
    <Sidebar icon={faList} title="目次">
      <div className="p-3">
        <div className="toc" />
      </div>
    </Sidebar>
  );
}

