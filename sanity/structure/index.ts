import {ListItemBuilder, StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {BookIcon, CogIcon, HomeIcon} from '@sanity/icons'

/**
 * Structure overrides
 *
 * Sanity Studio automatically lists document types out of the box.
 * With this custom structure we achieve things like showing the `home`
 * and `settings` document types as singletons, and grouping product details
 * and variants for easy editorial access.
 *
 * You can customize this even further as your schema types progress.
 * To learn more about structure builder, visit our docs:
 * https://www.sanity.io/docs/overview-structure-builder
 */

// If you add document types to structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'article',
    'home',
    'settings',
    'media.tag',
    'mux.videoAsset',
    'assist.instruction.context',
  ].includes(id)
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.divider(),

      S.listItem()
        .id('home')
        .title('Home')
        .icon(HomeIcon)
        .child(S.editor().title('Home').schemaType('home').documentId('home')),

      orderableDocumentListDeskItem({
        type: 'article',
        S,
        context,
        title: 'Library',
        icon: BookIcon,
      }),

      S.listItem()
        .id('settings')
        .title('Settings')
        .icon(CogIcon)
        .child(S.editor().title('Settings').schemaType('settings').documentId('settings')),

      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
