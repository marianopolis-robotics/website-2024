<svelte:head>
  <meta name="description" content="Blueprints for the Mari Angryneers' robot">
  <title>Robot | Mari Angryneers</title>
</svelte:head>

<script>
  import { userStore } from '$lib/Store';
  import Panel from '$lib/components/robot/Panel.svelte';
  import ModelRow from '$lib/components/robot/ModelRow.svelte';
  import Gallery from '$lib/components/robot/Gallery.svelte';

  let displayName = $userStore.name ? $userStore.name : "Angryneer";
</script>

<h1 class="col text-center text-white display-1 my-5">Robot</h1>
<p class="mt-3 mx-3 mx-sm-5 px-4 px-md-5 py-3 py-md-4 desc-box">Here is everything you need to know about the Mari Angryneers' robot for Kryptik 2024, {displayName}! 
  We've documented how each system works and how we faced numerous challenges along the way, just for you.</p>

<Panel>
  <ModelRow model="toboggan">
    <h2 class="text-center mb-4">The intake and toboggan systems</h2>
    <p>Here is a 3D model of our toboggan (or highway) system! You can check out the 3D model of the full robot to see how the intake and toboggan function together.</p>
    <p>
      The intake system is powered by a single Gobilda motor. It is a roller-type intake, with a row of 5 flex wheels sandwiching the game piece against a ramp.
    </p>
    <p>The rotational movement provided by the motor drives the game piece up the ramp and into the conveyors above, which will further bring the game piece upwards to our desired height.</p>
    <p>
      We had to innovate to couple the D-shaft from the power motor to the ½" hex shaft holding the wheels with custom made adaptors!
    </p>
    <br />
    <p>
      After having picked up a game piece, it travels down a plexiglass ramp by utilising gravitational force. It twists and turns, optimising the limited space at our disposition to store the maximum number of game pieces. 
    </p>
    <p>This system can store multiple game pieces in a single file, similar to a highway! At its end, the toboggan curves downwards into a halfpipe, preparing the game piece for the next part of its journey: the tower.</p>
  </ModelRow>
  <ModelRow model="tower" config="caption">
    <h2 class="text-center mb-4">The tower</h2>
    <p>
      The tower is the tallest structure of the robot. A Gobilda motor powers a long conveyor belt spanning the entire height of the tower.
    </p>
    <p>Similar to the intake system, this conveyor belt presses the game piece against a long sheet of plexiglass while spinning, thus pushing it upwards.</p>
    <p>The tower allows the robot to bring the game piece to a higher altitude, effectively canalysing and aligning it to be fired out of the shooting mechanism.</p>
    <br />
    <h2 class="text-center mb-4">Our first challenge</h2>
    <p>The first challenge was a difficult choice for the conceptual design of the robot that would yield divergent approaches to the game.</p>
    <p>The team was hesitating between a simple design with a single conveyor belt connecting the intake directly to the launching mechanism and a rather complex design that would incorporate a curved ramp to be able to hold more game pieces.</p>
    <p>In the end, we chose the larger storage capacity over the fast-firing design since it minimized the amount of time spent to collect game pieces.</p>
  </ModelRow>
  <ModelRow model="flywheels">
    <h2 class="text-center mb-4">The flywheel system</h2>
    <p>
      The final step in a game piece's journey in the robot is the firing mechanism: our double flywheel system. A pair of high RPM Banebot power motors coupled with 3:1 gearbox ratios spins our Colson flywheels at very high speeds. 
    </p>
    <p>When the game piece enters this firing system, it is compressed slightly by the pair of fast-spinning wheels before being launched at an angle of approximately 40 degrees.</p>
    <p>This makes sure that the game piece covers a considerable distance while gaining height to reach our targets.</p>
    <br />
    <h2 class="text-center mb-4">Our second challenge</h2>
    <p>The second challenge involved finding an appropriate RPM for the 4 drive motors, namely the Banebot 550s.</p>
    <p>While we wanted to increase the speed of the robot, some higher RPM motors would emit smoke due to the lack of torque under the weight of the robot.</p>
    <p>Finally, we settled on lower RPM (with higher torque) coupled with 64:1 gearboxes to solve the problem.</p>

  </ModelRow>
  <ModelRow model="robotfinal" config="caption">
    <h2 class="text-center mb-4">The robot</h2>
    <p>And now, {displayName}, we present the robot in all its glory! Look at how far we've come since the very first slingshot...</p>
    <p>The robot base is powered by 4 Banebot Power Motors coupled with 64:1 gearbox ratios.</p>
    <p>These gearbox ratios offer a balance between speed and torque, enabling us to both climb the slope toward the central gutters and move across the playing field more efficiently.</p>
    <p> 
      We chose Mecanum wheels for omnidirectional movement that allows for a wide range of motions that will help us be more versatile and be more impactful in a match!</p>
    <br />
    <h2 class="text-center mb-4">Our third challenge</h2>
    <p>A third major challenge was the fine tuning of the firing mechanism.</p>
    <p>While we ensured our conveyor belt leading to the shooting mechanism was consistent, it was difficult to quickly determine the speed at which the flywheels should spin to hit the targets precisely.</p>
    <p>Accordingly, we coded a simple user interface that could quickly communicate with the Arduino to set various speeds for the double-flywheel system.</p>
  </ModelRow>
</Panel>

<Gallery />

<style>
  h2 {
    font-size: 1.8rem;
  }

  p {
    font-size: 1.1rem;
  }

  @media screen and (min-width: 768px) {
    h2 {
    font-size: 3.2rem;
  }

    p {
      font-size: 1.5rem;
    }
  }
</style>