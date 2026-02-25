type PlatformConfig = {
    generalCommissionRate: number;
    pricePerLead: number;
};

// Obtenemos los valores guardados localmente, de lo contrario valores por defecto
const savedConfig = localStorage.getItem('ys_platform_config');
const initialConfig: PlatformConfig = savedConfig ? JSON.parse(savedConfig) : {
    generalCommissionRate: 15, // 15%
    pricePerLead: 1500,        // $1500
};

export const platformConfig = {
    get: (): PlatformConfig => {
        const data = localStorage.getItem('ys_platform_config');
        return data ? JSON.parse(data) : initialConfig;
    },
    set: (config: Partial<PlatformConfig>) => {
        const current = platformConfig.get();
        const updated = { ...current, ...config };
        localStorage.setItem('ys_platform_config', JSON.stringify(updated));
        return updated;
    }
}
