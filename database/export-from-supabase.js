/**
 * Script to export data from Supabase to SQL INSERT statements
 * Run this script BEFORE migrating to get your current data
 *
 * Usage: node database/export-from-supabase.js
 */

import { supabase } from '../src/lib/supabase.js';
import fs from 'fs';
import path from 'path';

async function exportData() {
  console.log('🔄 Starting Supabase data export...\n');

  let sqlOutput = `-- ================================================
-- Data Export from Supabase
-- Generated on ${new Date().toISOString()}
-- ================================================\n\n`;

  try {
    // Export posts
    console.log('📝 Exporting posts...');
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: true });

    if (postsError) {
      console.error('❌ Error fetching posts:', postsError);
    } else {
      sqlOutput += `-- ================================================\n`;
      sqlOutput += `-- Posts Data (${posts.length} records)\n`;
      sqlOutput += `-- ================================================\n\n`;

      if (posts.length > 0) {
        posts.forEach(post => {
          const slug = escapeString(post.slug);
          const title = escapeString(post.title);
          const excerpt = post.excerpt ? `'${escapeString(post.excerpt)}'` : 'NULL';
          const content = post.content ? `'${escapeString(post.content)}'` : 'NULL';
          const coverImage = post.cover_image_url ? `'${escapeString(post.cover_image_url)}'` : 'NULL';
          const authorName = post.author_name ? `'${escapeString(post.author_name)}'` : 'NULL';
          const publishedAt = post.published_at ? `'${post.published_at}'` : 'NULL';
          const createdAt = post.created_at ? `'${post.created_at}'` : 'NOW()';

          sqlOutput += `INSERT INTO posts (slug, title, excerpt, content, cover_image_url, author_name, published_at, created_at) VALUES\n`;
          sqlOutput += `('${slug}', '${title}', ${excerpt}, ${content}, ${coverImage}, ${authorName}, ${publishedAt}, ${createdAt});\n\n`;
        });
        console.log(`✅ Exported ${posts.length} posts`);
      } else {
        console.log('⚠️  No posts found');
      }
    }

    // Export pricing_items
    console.log('\n💰 Exporting pricing items...');
    const { data: pricingItems, error: pricingError } = await supabase
      .from('pricing_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (pricingError) {
      console.error('❌ Error fetching pricing items:', pricingError);
    } else {
      sqlOutput += `\n-- ================================================\n`;
      sqlOutput += `-- Pricing Items Data (${pricingItems.length} records)\n`;
      sqlOutput += `-- ================================================\n\n`;

      if (pricingItems.length > 0) {
        pricingItems.forEach(item => {
          const type = escapeString(item.type);
          const solution = escapeString(item.solution);
          const prixPartenaire = item.prix_partenaire ? parseFloat(item.prix_partenaire.replace(',', '.')) : 'NULL';
          const commission = item.commission ? parseFloat(item.commission.replace(',', '.')) : 'NULL';
          const prixRevendeur = item.prix_revendeur ? parseFloat(item.prix_revendeur.replace(',', '.')) : 'NULL';
          const prixPublic = item.prix_public ? parseFloat(item.prix_public.replace(',', '.')) : 'NULL';
          const displayOrder = item.display_order || 0;

          sqlOutput += `INSERT INTO pricing_items (type, solution, prix_partenaire, commission, prix_revendeur, prix_public, display_order) VALUES\n`;
          sqlOutput += `('${type}', '${solution}', ${prixPartenaire}, ${commission}, ${prixRevendeur}, ${prixPublic}, ${displayOrder});\n\n`;
        });
        console.log(`✅ Exported ${pricingItems.length} pricing items`);
      } else {
        console.log('⚠️  No pricing items found');
      }
    }

    // Write to file
    const outputPath = path.join(process.cwd(), 'database', 'data-export.sql');
    fs.writeFileSync(outputPath, sqlOutput, 'utf8');

    console.log('\n✅ Export completed successfully!');
    console.log(`📄 File saved to: ${outputPath}`);
    console.log('\n📋 Next steps:');
    console.log('1. Review the generated SQL file');
    console.log('2. Import schema.sql into your MySQL database via phpMyAdmin');
    console.log('3. Import data-export.sql into your MySQL database via phpMyAdmin');

  } catch (error) {
    console.error('\n❌ Export failed:', error);
    process.exit(1);
  }
}

/**
 * Escape string for SQL insertion
 */
function escapeString(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

// Run export
exportData();
