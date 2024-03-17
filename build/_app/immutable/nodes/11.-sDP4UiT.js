import{s as re,a as ue,r as ne,c as ie,o as oe,n as U}from"../chunks/scheduler.jvFJbBRN.js";import{S as se,i as ae,e as v,s as O,c as G,q as Q,h as pe,a as k,d as r,b as T,f as V,g as Y,j as me,k as u,m as J,r as X,l as R,u as ce,t as A,n as L,v as fe,o as j,w as C,x as $}from"../chunks/index.H6jmqOow.js";import{g as de}from"../chunks/globals.0cDDIVm6.js";import{u as be}from"../chunks/Store.kDbgPrtP.js";import{I as _e,C as ve,a as ke,b as Ce}from"../chunks/Carousel.aytU7VTL.js";const{window:E}=de;function $e(b){let l,s="Veuillez utiliser votre appareil en mode paysage pour jouer la simulation Kryptik.";return{c(){l=v("p"),l.textContent=s,this.h()},l(n){l=k(n,"P",{class:!0,"data-svelte-h":!0}),j(l)!=="svelte-dsv74z"&&(l.textContent=s),this.h()},h(){Y(l,"class","landscapeWarning position-relative text-danger pt-2 pb-4 px-5 svelte-1tc9g2k")},m(n,i){u(n,l,i)},p:U,i:U,o:U,d(n){n&&r(l)}}}function ze(b){let l,s,n,i;return l=new ke({props:{isFr:!0,name:b[4],$$slots:{default:[je]},$$scope:{ctx:b}}}),n=new Ce({props:{isFr:!0,mobile:b[3],winH:b[1]}}),{c(){G(l.$$.fragment),s=O(),G(n.$$.fragment)},l(e){V(l.$$.fragment,e),s=T(e),V(n.$$.fragment,e)},m(e,p){J(l,e,p),u(e,s,p),J(n,e,p),i=!0},p(e,p){const m={};p&520&&(m.$$scope={dirty:p,ctx:e}),l.$set(m);const c={};p&8&&(c.mobile=e[3]),p&2&&(c.winH=e[1]),n.$set(c)},i(e){i||(A(l.$$.fragment,e),A(n.$$.fragment,e),i=!0)},o(e){R(l.$$.fragment,e),R(n.$$.fragment,e),i=!1},d(e){e&&r(s),L(l,e),L(n,e)}}}function xe(b){let l,s,n="Esc",i,e,p,m,c="I",a,d,y="O",w,h,z,x,o="WASD",_,B,P,q,Z="Q",g,K,ee="E",S,M,te="Espace",F,H,W,D,le="M",I,N;return{c(){l=C("Cliquez sur la fenêtre de la simulation pour démarrer une joute Kryptik de 5 minutes. Appuyez sur "),s=v("kbd"),s.textContent=n,i=C(" pour sortir de la simulation."),e=v("br"),p=C(`\r
			Caméra: déplacez votre curseur pour changer l'orientation de la vue, utilisez la touche `),m=v("kbd"),m.textContent=c,a=C(" pour zoomer, "),d=v("kbd"),d.textContent=y,w=C(" pour effectuer un zoom arrière."),h=v("br"),z=C(`\r
			Mouvement: les touches `),x=v("kbd"),x.textContent=o,_=C(" pour déplacer le robot."),B=v("br"),P=C(`\r
			Projection: la touche `),q=v("kbd"),q.textContent=Z,g=C(" pour augmenter la puissance, "),K=v("kbd"),K.textContent=ee,S=C(" pour diminuer la puissance, la barre "),M=v("kbd"),M.textContent=te,F=C(" pour lancer une pièce de jeu."),H=v("br"),W=C(`\r
			Multiplicateur: la touche `),D=v("kbd"),D.textContent=le,I=C(" pour activer un multiplicateur."),N=v("br")},l(t){l=$(t,"Cliquez sur la fenêtre de la simulation pour démarrer une joute Kryptik de 5 minutes. Appuyez sur "),s=k(t,"KBD",{"data-svelte-h":!0}),j(s)!=="svelte-1r9pi07"&&(s.textContent=n),i=$(t," pour sortir de la simulation."),e=k(t,"BR",{}),p=$(t,`\r
			Caméra: déplacez votre curseur pour changer l'orientation de la vue, utilisez la touche `),m=k(t,"KBD",{"data-svelte-h":!0}),j(m)!=="svelte-2jy2c1"&&(m.textContent=c),a=$(t," pour zoomer, "),d=k(t,"KBD",{"data-svelte-h":!0}),j(d)!=="svelte-5klo9b"&&(d.textContent=y),w=$(t," pour effectuer un zoom arrière."),h=k(t,"BR",{}),z=$(t,`\r
			Mouvement: les touches `),x=k(t,"KBD",{"data-svelte-h":!0}),j(x)!=="svelte-wufu61"&&(x.textContent=o),_=$(t," pour déplacer le robot."),B=k(t,"BR",{}),P=$(t,`\r
			Projection: la touche `),q=k(t,"KBD",{"data-svelte-h":!0}),j(q)!=="svelte-1xjwejt"&&(q.textContent=Z),g=$(t," pour augmenter la puissance, "),K=k(t,"KBD",{"data-svelte-h":!0}),j(K)!=="svelte-8ljhsd"&&(K.textContent=ee),S=$(t," pour diminuer la puissance, la barre "),M=k(t,"KBD",{"data-svelte-h":!0}),j(M)!=="svelte-14umd0h"&&(M.textContent=te),F=$(t," pour lancer une pièce de jeu."),H=k(t,"BR",{}),W=$(t,`\r
			Multiplicateur: la touche `),D=k(t,"KBD",{"data-svelte-h":!0}),j(D)!=="svelte-4kdsqt"&&(D.textContent=le),I=$(t," pour activer un multiplicateur."),N=k(t,"BR",{})},m(t,f){u(t,l,f),u(t,s,f),u(t,i,f),u(t,e,f),u(t,p,f),u(t,m,f),u(t,a,f),u(t,d,f),u(t,w,f),u(t,h,f),u(t,z,f),u(t,x,f),u(t,_,f),u(t,B,f),u(t,P,f),u(t,q,f),u(t,g,f),u(t,K,f),u(t,S,f),u(t,M,f),u(t,F,f),u(t,H,f),u(t,W,f),u(t,D,f),u(t,I,f),u(t,N,f)},d(t){t&&(r(l),r(s),r(i),r(e),r(p),r(m),r(a),r(d),r(w),r(h),r(z),r(x),r(_),r(B),r(P),r(q),r(g),r(K),r(S),r(M),r(F),r(H),r(W),r(D),r(I),r(N))}}}function we(b){let l,s,n,i,e,p,m,c;return{c(){l=C("Caméra: glissez le côté droit de l'écran de la simulation (légèrement ombré) pour changer l'orientation de la vue."),s=v("br"),n=C(`\r
			Mouvement: utilisez la manette de jeu dans le coin en bas à gauche de la simulation.`),i=v("br"),e=C(`\r
			Projection: glissez le curseur de défilement en bas à droite pour augmenter ou diminuer la puissance, cliquez sur le bouton lance-pierre pour lancer une pièce de jeu.`),p=v("br"),m=C(`\r
			Multiplicateur: cliquez sur le bouton qui apparaît lorsque vous vous rapprochez d'un multiplicateur pour activer le multiplicateur.`),c=v("br")},l(a){l=$(a,"Caméra: glissez le côté droit de l'écran de la simulation (légèrement ombré) pour changer l'orientation de la vue."),s=k(a,"BR",{}),n=$(a,`\r
			Mouvement: utilisez la manette de jeu dans le coin en bas à gauche de la simulation.`),i=k(a,"BR",{}),e=$(a,`\r
			Projection: glissez le curseur de défilement en bas à droite pour augmenter ou diminuer la puissance, cliquez sur le bouton lance-pierre pour lancer une pièce de jeu.`),p=k(a,"BR",{}),m=$(a,`\r
			Multiplicateur: cliquez sur le bouton qui apparaît lorsque vous vous rapprochez d'un multiplicateur pour activer le multiplicateur.`),c=k(a,"BR",{})},m(a,d){u(a,l,d),u(a,s,d),u(a,n,d),u(a,i,d),u(a,e,d),u(a,p,d),u(a,m,d),u(a,c,d)},d(a){a&&(r(l),r(s),r(n),r(i),r(e),r(p),r(m),r(c))}}}function je(b){let l;function s(e,p){return e[3]?we:xe}let n=s(b),i=n(b);return{c(){i.c(),l=Q()},l(e){i.l(e),l=Q()},m(e,p){i.m(e,p),u(e,l,p)},p(e,p){n!==(n=s(e))&&(i.d(1),i=n(e),i&&(i.c(),i.m(l.parentNode,l)))},d(e){e&&r(l),i.d(e)}}}function ye(b){let l,s,n,i,e,p,m,c,a,d,y,w;ue(b[7]),n=new _e({props:{name:b[4],isFr:!0}}),e=new ve({props:{isFr:!0}});const h=[ze,$e],z=[];function x(o,_){return o[2]?0:1}return m=x(b),c=z[m]=h[m](b),{c(){l=v("meta"),s=O(),G(n.$$.fragment),i=O(),G(e.$$.fragment),p=O(),c.c(),a=Q(),this.h()},l(o){const _=pe("svelte-1hfslt",document.head);l=k(_,"META",{name:!0,content:!0}),_.forEach(r),s=T(o),V(n.$$.fragment,o),i=T(o),V(e.$$.fragment,o),p=T(o),c.l(o),a=Q(),this.h()},h(){Y(l,"name","description"),Y(l,"content","En savoir plus sur Kryptik, la compétition d'Angrynierie annuelle!"),document.title="Kryptik | Angrynieurs Mari"},m(o,_){me(document.head,l),u(o,s,_),J(n,o,_),u(o,i,_),J(e,o,_),u(o,p,_),z[m].m(o,_),u(o,a,_),d=!0,y||(w=[X(E,"resize",b[5]),X(E,"pageshow",b[6]),X(E,"resize",b[7])],y=!0)},p(o,[_]){let B=m;m=x(o),m===B?z[m].p(o,_):(fe(),R(z[B],1,1,()=>{z[B]=null}),ce(),c=z[m],c?c.p(o,_):(c=z[m]=h[m](o),c.c()),A(c,1),c.m(a.parentNode,a))},i(o){d||(A(n.$$.fragment,o),A(e.$$.fragment,o),A(c),d=!0)},o(o){R(n.$$.fragment,o),R(e.$$.fragment,o),R(c),d=!1},d(o){o&&(r(s),r(i),r(p),r(a)),r(l),L(n,o),L(e,o),z[m].d(o),y=!1,ne(w)}}}function Be(b,l,s){let n;ie(b,be,w=>s(8,n=w));let i,e,p=!1,m=n.name,c;function a(){setTimeout(()=>s(2,p=i>e),500)}oe(()=>{a()});const d=()=>s(3,c=window.matchMedia("(pointer: coarse)").matches);function y(){s(0,i=E.innerWidth),s(1,e=E.innerHeight)}return[i,e,p,c,m,a,d,y]}class Re extends se{constructor(l){super(),ae(this,l,Be,ye,re,{})}}export{Re as component};
