<?php

declare(strict_types=1);

namespace Buyanov\Autocomplete\Model\DataObject\Data;

use Pimcore\Model\DataObject\ClassDefinition\Data;

class Autocomplete extends Data\Select
{
    /**
     * @var string
     */
    public $fieldtype = 'autocomplete';

    public string $dataSourceRoute = '';

    /**
     * @return string
     */
    public function getDataSourceRoute(): string
    {
        return $this->dataSourceRoute;
    }

    /**
     * @param string $dataSourceRoute
     */
    public function setDataSourceRoute(string $dataSourceRoute): void
    {
        $this->dataSourceRoute = $dataSourceRoute;
    }
}
