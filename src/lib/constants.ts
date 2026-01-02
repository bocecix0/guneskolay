// Turkish cities for the location selector
export const CITIES = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya',
    'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik',
    'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum',
    'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
    'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul',
    'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale',
    'Kırklareli', 'Kırşehir', 'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa',
    'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye',
    'Rize', 'Sakarya', 'Samsun', 'Şanlıurfa', 'Siirt', 'Sinop', 'Şırnak', 'Sivas',
    'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
] as const

// Bill ranges in Turkish Lira
export const BILL_RANGES = [
    { value: '0-500', label: '0 - 500 ₺' },
    { value: '500-1000', label: '500 - 1.000 ₺' },
    { value: '1000-2000', label: '1.000 - 2.000 ₺' },
    { value: '2000-3000', label: '2.000 - 3.000 ₺' },
    { value: '3000-5000', label: '3.000 - 5.000 ₺' },
    { value: '5000+', label: '5.000 ₺ ve üzeri' },
] as const

// Property types
export const PROPERTY_TYPES = [
    { value: 'mustakil', label: 'Müstakil Ev' },
    { value: 'site', label: 'Site / Apartman' },
    { value: 'isyeri', label: 'İşyeri / Fabrika' },
] as const

// Roof types
export const ROOF_TYPES = [
    { value: 'duz', label: 'Düz Çatı (Teras)' },
    { value: 'egimli', label: 'Eğimli Çatı (Kiremit)' },
    { value: 'bilmiyorum', label: 'Bilmiyorum' },
] as const

// Installation timeline
export const TIMELINES = [
    { value: 'hemen', label: 'Hemen (1 ay içinde)' },
    { value: '1-3-ay', label: '1-3 Ay İçinde' },
    { value: '3-6-ay', label: '3-6 Ay İçinde' },
] as const

// Budget ranges
export const BUDGET_RANGES = [
    { value: '', label: 'Belirtmek istemiyorum' },
    { value: '50000-100000', label: '50.000 - 100.000 ₺' },
    { value: '100000-200000', label: '100.000 - 200.000 ₺' },
    { value: '200000-350000', label: '200.000 - 350.000 ₺' },
    { value: '350000-500000', label: '350.000 - 500.000 ₺' },
    { value: '500000+', label: '500.000 ₺ ve üzeri' },
] as const

// Lead statuses
export const LEAD_STATUSES = [
    { value: 'new', label: 'Yeni', color: 'bg-blue-100 text-blue-800' },
    { value: 'contacted', label: 'İletişime Geçildi', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'qualified', label: 'Nitelikli', color: 'bg-green-100 text-green-800' },
    { value: 'closed', label: 'Kapandı', color: 'bg-gray-100 text-gray-800' },
    { value: 'spam', label: 'Spam', color: 'bg-red-100 text-red-800' },
] as const

// Installer statuses
export const INSTALLER_STATUSES = [
    { value: 'pending', label: 'Beklemede', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'approved', label: 'Onaylandı', color: 'bg-green-100 text-green-800' },
    { value: 'rejected', label: 'Reddedildi', color: 'bg-red-100 text-red-800' },
] as const

// Installer capacity options
export const CAPACITY_OPTIONS = [
    { value: 1, label: '1 kurulum/ay' },
    { value: 2, label: '2-3 kurulum/ay' },
    { value: 5, label: '5-10 kurulum/ay' },
    { value: 10, label: '10+ kurulum/ay' },
] as const
