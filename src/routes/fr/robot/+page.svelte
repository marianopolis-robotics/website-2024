<svelte:head>
  <meta name="description" content="Blueprints for the Mari Angryneers' robot">
  <title>Robot | Angrynieurs Mari</title>
</svelte:head>

<script>
  import { userStore } from '$lib/Store';
  import Panel from '$lib/components/robot/Panel.svelte';
  import ModelRow from '$lib/components/robot/ModelRow.svelte';
  import Gallery from '$lib/components/robot/Gallery.svelte';

  let displayName = $userStore.name ? $userStore.name : "Angryneer";
</script>

<h1 class="col text-center text-white display-1 my-5">Robot</h1>
<p class="mx-4 mx-sm-5 mb-5 py-4 px-5 desc-box">Voici tout ce qu'il y a à savoir sur le robot des angrynieurs Mari pour Kryptik 2024, {displayName}! 
  Nous avons documenté comment fonctionne chaque système et comment nous avons affronté plusieurs défis au cours des phases de construction.</p>

<Panel>
  <ModelRow model="toboggan">
    <h2 class="text-center mb-4">Le mécanisme d'admission et le système de toboggan</h2>
    <p>Voici un modèle 3D de notre système de toboggan (ou d'autoroute)! Vous pouvez regarder le modèle 3D du robot complet pour voir comment le mécanisme d'admission et le système de toboggan fonctionnent comme un tout.</p>
    <p>
      Le système d'admission est alimenté par un seul moteur Gobilda. Il s'agit d'un système d'admission à rouleaux, avec une rangée de 5 roues flexibles prenant en sandwich la pièce de jeu contre une rampe.
    </p>
    <p>Le mouvement de rotation fourni par le moteur entraîne la pièce de jeu vers le haut de la rampe et dans les convoyeurs situés au-dessus, qui amèneront la pièce de jeu à la hauteur souhaitée.</p>
    <p>
      Nous avons dû innover pour coupler l'arbre en D du moteur électrique à l'arbre hexagonal de ½" qui maintient les roues à l'aide d'adaptateurs fabriqués sur mesure!
    </p>
    <br />
    <p>
      Après avoir ramassé une pièce de jeu, celle-ci dévale une rampe en plexiglas en utilisant la force gravitationnelle. Elle tourne et vire, optimisant l'espace limité dont nous disposons pour stocker un maximum de pièces de jeu. 
    </p>
    <p>Ce système permet de ranger plusieurs pièces de jeu dans une seule file, comme sur une autoroute! À son extrémité, le toboggan s'incurve vers le bas en une demi-lune, préparant la pièce de jeu pour la prochaine partie de son voyage: la tour.</p>
  </ModelRow>
  <ModelRow model="tower" config="caption">
    <h2 class="text-center mb-4">La tour</h2>
    <p>
      La tour est la structure la plus haute du robot. Un moteur Gobilda alimente un long convoyeur qui s'étend sur toute la hauteur de la tour.
    </p>
    <p>Similaire au système d'admission, ce tapis roulant presse la pièce de jeu contre une longue feuille de plexiglas tout en tournant, la poussant ainsi vers le haut.</p>
    <p>La tour permet au robot d'amener la pièce de jeu à une altitude plus élevée, la canalisant et l'alignant efficacement pour qu'elle soit propulsée par le mécanisme de tir.</p>
    <br />
    <h2 class="text-center mb-4">Notre premier défi</h2>
    <p>Le premier défi consistait à faire un choix difficile pour la conception du robot, ce qui entraînerait des approches divergentes pour le jeu.</p>
    <p>L'équipe hésitait entre une conception simple avec un seul convoyeur reliant l'admission directement au mécanisme de lancement et une conception plutôt complexe qui incorporerait une pente courbée pour pouvoir transporter plus de pièces de jeu.</p>
    <p>En fin de compte, nous avons opté pour une plus grande capacité de stockage plutôt que pour une mise à feu rapide, car cela permettait de minimiser le temps nécessaire à la collecte des pièces de jeu.</p>
  </ModelRow>
  <ModelRow model="flywheels">
    <h2 class="text-center mb-4">Le système de volant d'inertie</h2>
    <p>
      L'étape finale du parcours d'une pièce de jeu dans le robot est le mécanisme de tir: notre système de double volant d'inertie. Une paire de moteurs Banebot à haut régime couplés à des rapports de boîte de vitesses de 3:1 fait tourner nos volants d'inertie Colson à des vitesses très élevées.
    </p>
    <p>Lorsque la pièce de jeu entre dans ce système de mise à feu, elle est légèrement comprimée par la paire de roues à rotation rapide avant d'être lancée à un angle d'environ 40 degrés.</p>
    <p>La pièce de jeu au prisonnier parcourt ainsi une distance considérable tout en prenant de la hauteur pour atteindre nos cibles.</p>
    <br />
    <h2 class="text-center mb-4">Notre deuxième défi</h2>
    <p>Le deuxième défi consistait à trouver une vitesse de rotation appropriée pour les 4 moteurs de propulsion, notamment les Banebot 550.</p>
    <p>Bien que nous souhaitions augmenter la vitesse du robot, certains moteurs à régime élevé émettraient de la fumée en raison du manque de torque sous le poids du robot.</p>
    <p>Finalement, nous avons opté pour des moteurs à plus faible régime (avec un couple plus élevé) combinés à des boîtes de vitesses 64:1 pour résoudre le problème.</p>

  </ModelRow>
  <ModelRow model="robotfinal" config="caption">
    <h2 class="text-center mb-4">The robot</h2>
    <p>Enfin, {displayName}, nous vous présentons le robot dans toute sa splendeur! Voyez tout ce qui a été accompli depuis le tout premier lance-pierre...</p>
    <p>La base du robot est propulsée par 4 moteurs de puissance Banebot couplés à des boîtes de vitesses de 64:1.</p>
    <p>Ces rapports de boîte de vitesses offrent un équilibre entre la vitesse et le couple, ce qui nous permet à la fois de gravir la pente vers les gouttières centrales et de nous déplacer plus efficacement sur le terrain de jeu.</p>
    <p> 
      Nous avons choisi les roues Mecanum pour un mouvement omnidirectionnel qui permet une large gamme de mouvements qui nous aideront à être plus polyvalents et à avoir plus d'impact dans un match!</p>
    <br />
    <h2 class="text-center mb-4">Notre troisième défi</h2>
    <p>Le troisième défi majeur a été la mise au point du mécanisme de tir.</p>
    <p>Bien que nous ayons veillé à ce que notre convoyeur menant au mécanisme de tir soit constant, il était difficile de déterminer rapidement la vitesse à laquelle les volants d'inertie devaient tourner pour atteindre les cibles avec précision.</p>
    <p>Nous avons donc codé une interface utilisateur simple, capable de communiquer rapidement avec l'Arduino pour régler les différentes vitesses du système à double volant.</p>
  </ModelRow>
</Panel>

<Gallery isFr={true} />

<style>
  h2 {
    font-size: 3.2rem;
  }

  p {
    font-size: 1.5rem;
  }
</style>