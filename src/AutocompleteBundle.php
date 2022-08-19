<?php

declare(strict_types=1);

namespace Buyanov\Autocomplete;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;
use Pimcore\Extension\Bundle\Traits\PackageVersionTrait;

class AutocompleteBundle extends AbstractPimcoreBundle
{
    use PackageVersionTrait;

    protected function getComposerPackageName(): string
    {
        return 'buyanov/pimcore-autocomplete-field';
    }

    public function getJsPaths()
    {
        return [
            '/bundles/autocomplete/js/pimcore/object/classes/data/autocomplete.js',
            '/bundles/autocomplete/js/pimcore/object/tags/autocomplete.js',
        ];
    }
}