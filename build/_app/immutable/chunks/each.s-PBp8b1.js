import{t as B}from"./index.H6jmqOow.js";import{r as C}from"./scheduler.jvFJbBRN.js";function F(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function G(n,w){n.d(1),w.delete(n.key)}function H(n,w,x,A,j,p,d,k,y,q,u,z){let i=n.length,f=p.length,c=i;const o={};for(;c--;)o[n[c].key]=c;const h=[],m=new Map,a=new Map,M=[];for(c=f;c--;){const e=z(j,p,c),s=x(e);let t=d.get(s);t?A&&M.push(()=>t.p(e,w)):(t=q(s,e),t.c()),m.set(s,h[c]=t),s in o&&a.set(s,Math.abs(c-o[s]))}const v=new Set,S=new Set;function g(e){B(e,1),e.m(k,u),d.set(e.key,e),u=e.first,f--}for(;i&&f;){const e=h[f-1],s=n[i-1],t=e.key,l=s.key;e===s?(u=e.first,i--,f--):m.has(l)?!d.has(t)||v.has(t)?g(e):S.has(l)?i--:a.get(t)>a.get(l)?(S.add(t),g(e)):(v.add(l),i--):(y(s,d),i--)}for(;i--;){const e=n[i];m.has(e.key)||y(e,d)}for(;f;)g(h[f-1]);return C(M),h}export{G as d,F as e,H as u};
