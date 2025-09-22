// This sketch is inspired by the physics-based graph from Obsidian.
// It simulates nodes connected by springs, with mutual repulsion.
//graph.js

let nodes = [];
let edges = [];
let draggedNode = null;
let potentialClickNode = null;
let clickStartTime = 0;
let clickStartPos = { x: 0, y: 0 };
const CLICK_THRESHOLD_DIST = 5; // Max pixels you can move for it to be a click
const CLICK_THRESHOLD_TIME = 300; // Max milliseconds for it to be a click


// --- CUSTOMIZATION SECTION ---

// 1. DEFINE THE CONTENT OF YOUR GRAPH
// Each node needs a 'label'. These should represent your key skills and interests.
const nodeData = [
    { //0
        title: "Quantum Computing",
        description: `My primary academic interest at the intersection of physics and information. My focus includes:
*   **Quantum Error Correction (QEC)**
*   **Quantum Key Distribution (QKD)**
*   **Complexity Theory (BQP)**

I will be taking [Quantum Complexity Theory](https://www.cl.cam.ac.uk/teaching/2526/L330/) as a module in Part II of Computer Science Tripos.
`,
        details: ["Error Correction Correction (QEC) ","Quantum Key Distribution (QKD)", "Complexity Theory (BQP)"],
        links: [
            // { text: "View QKD Simulation Project", url: "#projects" },
            { text: "Read Essay on QEC", url: "#writing" }
        ]
    }, //1
        {
        title: "Olympiad Geometry",
        description: `My experience in Olympiad-level geometry taught me *creative problem-solving* 
        and *pattern matching*.`,
        links: [
            { text: "See my EGMO Achievement", url: "#olympiad-math" },
            { text: "Read my 'Book of Lemmas'", url: "#olympiad-math" }
        ]
    },
    { //2
        title: "AI & Machine Learning",
        description: `Through my algorithmic background, 
        I am particularly interested in *AI for scientific problem-solving*, such as neural-symbolic systems like AlphaGeometry.`,
        details: ["Deep learning", "Applications to problem solving"],
        links: [
            // { text: "View Automated Problem Solver", url: "#projects" },
            { text: "View ChessPuzzy Project", url: "#project-chess" }
        ]
    },
    {  //3
        title: "Algorithms", 
        description: `Deep understanding developed through *competitive programming*:
*   Algorithm design
*   Data Structures
*   Complexity Analysis`,
        details: ["Competitive Programming", "Complexity Analysis", "Data Structures"], 
        links: [
            {text: "View my Informatics olympiad section", url: "#olympiad"}
        ] },
    { //4
        title: "Software Engineering", 
        description: `I enjoy designing software. My skills include:
*   Full-Stack Development
*   Version Control (Git)
*   API Design (REST)`,
        details: ["Full-Stack Development", "Version Control (Git)"], 
        links: [{ text: "See All Projects", url: "#projects" }] },
    { //5
        title: "Cybersecurity", 
        description: `I am interested in both classical and quantum information security. 
        This includes *cryptographic protocols* and network security principles.`,
        details: ["Cryptography", "Classical & Quantum Protocols", , "Computer networking"], 
        links: [
            // { text: "View QKD Project", url: "#projects" }
        ] 
    },
    { //6
        title: "Data Science",
        description: `Experience with statistical techniques like *model fitting* and data analysis pipelines using Python libraries.`,
        details: ["Model fitting" ], 
        links: [
            // { text: "View QKD Project", url: "#projects" }
        ] 
    },
    { //7
        title: "Complexity theory",
        description: `A deep interest in the fundamental limits of computation. My undergraduate project involves implementing a key result in *time-space tradeoffs*.`,
        details: [ ], 
        links: [
            // { text: "View QKD Project", url: "#projects" }
            { text: "View my undergraduate project", url: "#writing" }
        ] 
    }
        // { //7
    //     title: "Physics",
    //     details: ["Quantum mechanics", "Particle physics" ], 
    //     links: [
    //         // { text: "View QKD Project", url: "#projects" }
    //     ] 
    // },
];

// Define connections between nodes by their index number from the list above.
// For example, [0, 5] connects "Quantum Computing" (index 0) to "Cryptography" (index 5).
const edgeData = [
    [0, 5], [0, 3], // Quantum links
     [1, 2], // Geometry links
    [2, 3], [2, 4], [2,6], // AI/ML links
    [3, 4], [3, 6], // Algorithms links
    [4,6], [4,5],
    [7,3], [7,0],
];


// 2. TWEAK THE PHYSICS
const REPULSION_STRENGTH = 1200;  // How much nodes push each other away.
const SPRING_STRENGTH = 0.04;     // How "tight" the connections are. Higher is tighter.
const SPRING_LENGTH = 180;        // The ideal resting length of a connection.
const DAMPING = 0.95;             // Simulates friction. 0.9 is high friction, 0.99 is low.


// 3. TWEAK THE AESTHETICS
const NODE_RADIUS = 10;
const NODE_COLOR = '#9d8eee';     // Purple
const EDGE_COLOR = 'rgba(157, 142, 238, 0.3)'; // Faint Purple
const TEXT_COLOR = '#e0e0e0';     // Light Gray

// --- END CUSTOMIZATION SECTION ---


function setup() {
    let canvasHolder = document.getElementById('canvas-holder');
    if (!canvasHolder) return; // Safety check

    let canvas = createCanvas(canvasHolder.offsetWidth, 400);
    canvas.parent('canvas-holder');

    // Create node objects with the CORRECT structure
    for (const data of nodeData) {
        nodes.push({
            data: data, // The detailed data is nested inside a 'data' property
            x: random(width),
            y: random(height),
            vx: 0,
            vy: 0,
            radius: NODE_RADIUS
        });
    }

    // Create edge objects
    for (const edge of edgeData) {
        if (edge[0] < nodes.length && edge[1] < nodes.length) {
            edges.push([nodes[edge[0]], nodes[edge[1]]]);
        }
    }
}

function draw() {
    if (!nodes.length) return;
    background('rgba(37, 37, 37, 0.8)'); // Slightly less transparent background

    // --- Physics Simulation (No changes needed here) ---
    for (let n of nodes) { for (let o of nodes) { if (n===o) continue; let d=dist(n.x,n.y,o.x,o.y); if(d<1)d=1; let f=REPULSION_STRENGTH/(d*d); n.vx+=f*(n.x-o.x)/d; n.vy+=f*(n.y-o.y)/d; } }
    for (let e of edges) { let nA=e[0],nB=e[1]; let d=dist(nA.x,nA.y,nB.x,nB.y); let displ=d-SPRING_LENGTH; let f=displ*SPRING_STRENGTH; let dx=nB.x-nA.x,dy=nB.y-nA.y; nA.vx+=f*(dx/d); nA.vy+=f*(dy/d); nB.vx-=f*(dx/d); nB.vy-=f*(dy/d); }
    for (let n of nodes) { if (n!==draggedNode) { n.vx*=DAMPING; n.vy*=DAMPING; n.x+=n.vx; n.y+=n.vy; n.x=constrain(n.x,n.radius,width-n.radius); n.y=constrain(n.y,n.radius,height-n.radius); } }

    // --- Drawing ---
    stroke(EDGE_COLOR); strokeWeight(2);
    for (let e of edges) { line(e[0].x, e[0].y, e[1].x, e[1].y); }
    noStroke(); fill(NODE_COLOR);
    for (let n of nodes) { ellipse(n.x, n.y, n.radius * 2); }
    fill(TEXT_COLOR); textAlign(CENTER, CENTER); textSize(14);
    // Draw text labels using the CORRECT data structure
    for (let n of nodes) {
        text(n.data.title, n.x, n.y - n.radius - 12);
    }

    // Change cursor on hover
    let isHovering = false;
    for (let n of nodes) { if (dist(mouseX, mouseY, n.x, n.y) < n.radius + 10) { isHovering = true; break; } }
    cursor(isHovering ? 'pointer' : 'grab');
}

// --- Interaction Logic (No changes needed here) ---
function mousePressed() { for (let n of nodes) { if (dist(mouseX, mouseY, n.x, n.y) < n.radius + 10) { potentialClickNode = n; clickStartTime = millis(); clickStartPos = { x: mouseX, y: mouseY }; return; } } }
function mouseDragged() { if (potentialClickNode && !draggedNode) { if (dist(mouseX, mouseY, clickStartPos.x, clickStartPos.y) > CLICK_THRESHOLD_DIST) { draggedNode = potentialClickNode; } } if (draggedNode) { draggedNode.x = mouseX; draggedNode.y = mouseY; } }
function mouseReleased() { if (potentialClickNode && !draggedNode) { const d = millis() - clickStartTime; if (d < CLICK_THRESHOLD_TIME) { if (window.openNodeModal) { window.openNodeModal(potentialClickNode.data); } } } if (draggedNode) { draggedNode.vx = (mouseX - pmouseX) * 0.5; draggedNode.vy = (mouseY - pmouseY) * 0.5; draggedNode = null; } potentialClickNode = null; }
function windowResized() { let h = document.getElementById('canvas-holder'); if (h) { resizeCanvas(h.offsetWidth, 400); } }