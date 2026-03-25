class UsersService {
    constructor() {
        this.users = [];
        this.output = document.getElementById('output');
    }

    // Método inicializador asíncrono
    async init() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error("Error en la red");
            this.users = await response.json();
            this.print("Datos cargados correctamente. Listo para operar.");
        } catch (error) {
            this.print("Error al cargar usuarios: " + error.message);
        }
    }

    // Función auxiliar para mostrar datos en el HTML
    print(data) {
        this.output.textContent = (typeof data === 'string') ? data : JSON.stringify(data, null, 2);
    }

    // 1. Listar solo los nombres de los usuarios
    listarNombres() {
        const nombres = this.users.map(u => u.name);
        this.print(nombres.join("\n"));
    }

    // 2. Obtener Info Básica (email y ciudad) por nombre
    infoBasica() {
        const nombre = prompt("Ingrese el nombre exacto del usuario:");
        const user = this.users.find(u => u.name === nombre);
        if (user) {
            this.print(`Email: ${user.email}\nCiudad: ${user.address.city}`);
        } else {
            this.print("Usuario no encontrado.");
        }
    }

    // 3. Obtener Dirección completa por nombre
    direccionPorNombre() {
        const nombre = prompt("Ingrese el nombre para ver su dirección:");
        const user = this.users.find(u => u.name === nombre);
        if (user) {
            const { street, suite, city, zipcode } = user.address;
            this.print(`Calle: ${street}, ${suite}\nCiudad: ${city}\nZip: ${zipcode}`);
        } else {
            this.print("Usuario no encontrado.");
        }
    }

    // 4. Info Avanzada (Username, Email, Web y Empresa)
    infoAvanzada() {
        const nombre = prompt("Ingrese el nombre para info avanzada:");
        const user = this.users.find(u => u.name === nombre);
        if (user) {
            this.print({
                username: user.username,
                email: user.email,
                website: user.website,
                company: user.company.name
            });
        } else {
            this.print("Usuario no encontrado.");
        }
    }

    // 5. Listar Compañías y sus frases (catchphrase)
    listarCompanias() {
        const empresas = this.users.map(u => `${u.company.name}: "${u.company.catchPhrase}"`);
        this.print(empresas.join("\n\n"));
    }

    // 6. Listar nombres ordenados alfabéticamente
    listarOrdenados() {
        const ordenados = [...this.users].map(u => u.name).sort();
        this.print(ordenados.join("\n"));
    }
}

// --- Lógica de ejecución ---
const svc = new UsersService();

// Iniciamos el servicio y luego asociamos los botones
svc.init().then(() => {
    document.getElementById('btnNombres').onclick = () => svc.listarNombres();
    document.getElementById('btnBasica').onclick = () => svc.infoBasica();
    document.getElementById('btnDireccion').onclick = () => svc.direccionPorNombre();
    document.getElementById('btnAvanzada').onclick = () => svc.infoAvanzada();
    document.getElementById('btnCompanias').onclick = () => svc.listarCompanias();
    document.getElementById('btnOrdenados').onclick = () => svc.listarOrdenados();
});