// Créer une scène
const scene = new THREE.Scene();

// Créer une caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Créer un renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Charger les textures
const texture1 = new THREE.TextureLoader().load('face1.png');
const texture2 = new THREE.TextureLoader().load('face2.png');
const texture3 = new THREE.TextureLoader().load('face3.png');
const texture4 = new THREE.TextureLoader().load('face4.png');
const texture5 = new THREE.TextureLoader().load('face5.png');
const texture6 = new THREE.TextureLoader().load('face6.png');

// Créer des matériaux pour chaque face avec les textures correspondantes
const materials = [
    new THREE.MeshBasicMaterial({ map: texture1 }), // Face 1 avec texture1
    new THREE.MeshBasicMaterial({ map: texture2 }), // Face 2 avec texture2
    new THREE.MeshBasicMaterial({ map: texture3 }), // Face 3 avec texture3
    new THREE.MeshBasicMaterial({ map: texture4 }), // Face 4 avec texture4
    new THREE.MeshBasicMaterial({ map: texture5 }), // Face 5 avec texture5
    new THREE.MeshBasicMaterial({ map: texture6 })  // Face 6 avec texture6
];

// Créer la géométrie du cube
const geometry = new THREE.BoxGeometry();

// Créer le cube avec les matériaux pour chaque face
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Ajuster la taille du cube
cube.scale.set(2, 2, 2); // Doubler la taille du cube dans toutes les dimensions

// Gestion de la souris pour la rotation et le zoom du cube
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

function onMouseMove(event) {
    const deltaMove = { x: event.clientX - previousMousePosition.x, y: event.clientY - previousMousePosition.y };
    if (isDragging) {
        const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            toRadians(deltaMove.y * 0.5), toRadians(deltaMove.x * 0.5), 0, 'XYZ'
        ));
        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
    }
    previousMousePosition = { x: event.clientX, y: event.clientY };
}

function onMouseDown(event) {
    if (event.button === 0) {
        isDragging = true;
    } else if (event.button === 2) { // Click droit
        onClick(event);
    }
}

function onMouseUp(event) {
    if (event.button === 0) {
        isDragging = false;
    }
}

function onMouseWheel(event) {
    event.preventDefault();

    // Définir les limites de zoom
    const minZoom = 3;
    const maxZoom = 10;

    // Mettre à jour la position de la caméra en fonction du mouvement de la roulette de la souris
    camera.position.z += event.deltaY * 0.01;

    // Vérifier si la position de la caméra dépasse les limites de zoom
    if (camera.position.z < minZoom) {
        camera.position.z = minZoom;
    } else if (camera.position.z > maxZoom) {
        camera.position.z = maxZoom;
    }
}

// Gestion de l'événement de clic sur une face du cube
function onClick(event) {
    const intersects = getIntersects(event.clientX, event.clientY);
    if (intersects.length > 0) {
        const faceIndex = intersects[0].face.materialIndex; // Utiliser materialIndex pour obtenir l'indice du matériau
        let link;
        switch (faceIndex) {
            case 0:
                link = "https://docs.google.com/document/d/1Jm8xDaO-ug5mJjd80_AtxVfbW34VrpgbbZk17uggI6E/edit?usp=drive_link"; // Lien pour Face 1 (face1.png)
                break;
            case 1:
                link = "https://docs.google.com/document/d/1N7Tvqwb08Dm8n8uIdzszmKlDtrLxQb9tIAgQ4718HiE/edit?usp=drive_link"; // Lien pour Face 2 (face2.png)
                break;
            case 3:
                link = "https://docs.google.com/document/d/1-1NHKdxr2bbCupoXDKOIg-6yjj-UJ_hKN3YdW4TXEx0/edit?usp=drive_link"; // Lien pour Face 4 (face4.png)
                break;
            case 4:
                link = "https://docs.google.com/document/d/1JEiMllBYAB7V8p-OHZQMotODQyS4I9Pvp7oge1YSZJA/edit?usp=drive_link"; // Lien pour Face 5 (face5.png)
                break;
            // Laisser les autres cas sans lien hypertexte
            default:
                return;
        }
        window.open(link, "_blank");
    }
}

// Fonction pour obtenir les intersections entre les rayons de la souris et les faces du cube
function getIntersects(x, y) {
    const vector = new THREE.Vector2((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1);
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(vector, camera);
    return raycaster.intersectObject(cube);
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Ajouter les écouteurs d'événements de la souris
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseUp, false);
document.addEventListener('wheel', onMouseWheel, false);
document.addEventListener('contextmenu', function (event) { event.preventDefault(); }, false); // Désactiver le menu contextuel

// Fonction de rendu (non modifié)
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.002;
    cube.rotation.y += 0.002;
    renderer.render(scene, camera);
}

animate();
