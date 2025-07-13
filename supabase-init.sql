
-- Create tables
CREATE TABLE IF NOT EXISTS supermarkets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE,
  logo_url TEXT,
  color VARCHAR DEFAULT 'bg-gray-500',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  brand VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  supermarket_id UUID REFERENCES supermarkets(id) ON DELETE CASCADE,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  discount INTEGER,
  availability BOOLEAN DEFAULT true,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample supermarkets
INSERT INTO supermarkets (name, color, logo_url) VALUES
('Carrefour', 'bg-blue-500', ''),
('Leclerc', 'bg-green-500', ''),
('Auchan', 'bg-red-500', ''),
('Intermarché', 'bg-orange-500', ''),
('Super U', 'bg-purple-500', ''),
('Casino', 'bg-pink-500', ''),
('Monoprix', 'bg-indigo-500', ''),
('Franprix', 'bg-teal-500', '')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, brand, description, category, rating, review_count, image_url) VALUES
('Nutella 400g', 'Ferrero', 'Pâte à tartiner aux noisettes et au cacao. Idéale pour le petit-déjeuner ou le goûter.', 'Petit-déjeuner', 4.5, 1247, ''),
('Lait Demi-Écrémé 1L', 'Lactel', 'Lait demi-écrémé de qualité supérieure, riche en calcium et vitamines.', 'Produits laitiers', 4.2, 892, ''),
('Pain de Mie Complet', 'Harry''s', 'Pain de mie complet, riche en fibres et parfait pour les sandwichs.', 'Boulangerie', 4.0, 654, '')
ON CONFLICT DO NOTHING;

-- Insert sample prices
INSERT INTO prices (product_id, supermarket_id, price, original_price, discount, availability, address)
SELECT 
  p.id,
  s.id,
  CASE 
    WHEN p.name = 'Nutella 400g' AND s.name = 'Carrefour' THEN 3.89
    WHEN p.name = 'Nutella 400g' AND s.name = 'Leclerc' THEN 3.75
    WHEN p.name = 'Nutella 400g' AND s.name = 'Auchan' THEN 4.15
    WHEN p.name = 'Nutella 400g' AND s.name = 'Intermarché' THEN 3.95
    WHEN p.name = 'Lait Demi-Écrémé 1L' AND s.name = 'Carrefour' THEN 1.25
    WHEN p.name = 'Lait Demi-Écrémé 1L' AND s.name = 'Leclerc' THEN 1.19
    WHEN p.name = 'Lait Demi-Écrémé 1L' AND s.name = 'Auchan' THEN 1.32
    WHEN p.name = 'Lait Demi-Écrémé 1L' AND s.name = 'Intermarché' THEN 1.28
    WHEN p.name = 'Pain de Mie Complet' AND s.name = 'Carrefour' THEN 1.89
    WHEN p.name = 'Pain de Mie Complet' AND s.name = 'Leclerc' THEN 1.95
    WHEN p.name = 'Pain de Mie Complet' AND s.name = 'Auchan' THEN 2.05
    WHEN p.name = 'Pain de Mie Complet' AND s.name = 'Intermarché' THEN 1.85
    ELSE 0
  END as price,
  CASE 
    WHEN p.name = 'Nutella 400g' AND s.name = 'Carrefour' THEN 4.29
    WHEN p.name = 'Pain de Mie Complet' AND s.name = 'Carrefour' THEN 2.15
    ELSE NULL
  END as original_price,
  CASE 
    WHEN p.name = 'Nutella 400g' AND s.name = 'Carrefour' THEN 9
    WHEN p.name = 'Pain de Mie Complet' AND s.name = 'Carrefour' THEN 12
    ELSE NULL
  END as discount,
  CASE 
    WHEN p.name = 'Nutella 400g' AND s.name = 'Intermarché' THEN false
    ELSE true
  END as availability,
  CASE 
    WHEN s.name = 'Carrefour' THEN 'Centre Commercial Carrefour, 123 Rue de la République'
    WHEN s.name = 'Leclerc' THEN 'Centre Commercial Leclerc, 456 Avenue des Champs'
    WHEN s.name = 'Auchan' THEN 'Auchan Hypermarché, 321 Route Nationale'
    WHEN s.name = 'Intermarché' THEN 'Intermarché Super, 789 Boulevard Central'
    ELSE 'Adresse non disponible'
  END as address
FROM products p
CROSS JOIN supermarkets s
WHERE s.name IN ('Carrefour', 'Leclerc', 'Auchan', 'Intermarché')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE supermarkets ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access on supermarkets" ON supermarkets FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on prices" ON prices FOR SELECT USING (true);
