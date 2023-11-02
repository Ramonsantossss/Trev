import React, { useEffect } from 'react';

function DisqusEmbed() {
  useEffect(() => {
    // O código Disqus
    (function() {
      var disqus_config = function () {
        this.page.url = window.location.href; // Pega a URL da página atual
        this.page.identifier = 'IDENTIFICADOR_UNICO'; // Um identificador exclusivo para a página
      };

      var d = document, s = d.createElement('script');
      s.src = 'https://manganime-7.disqus.com/embed.js'; // Substitua SEU_SHORTNAME pelo seu "shortname"
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }, []);

  return (
    <div id="disqus_thread"></div>
  );
}

export default DisqusEmbed;
