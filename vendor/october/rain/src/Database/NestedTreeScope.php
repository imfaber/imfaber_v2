<?php namespace October\Rain\Database;

use Illuminate\Database\Eloquent\Builder as BuilderBase;
use Illuminate\Database\Eloquent\ScopeInterface;

class NestedTreeScope implements ScopeInterface
{

    /**
     * Apply the scope to a given Eloquent query builder.
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @return void
     */
    public function apply(BuilderBase $builder)
    {
        $model = $builder->getModel();
        $builder->orderBy($model->getLeftColumnName());
    }

    /**
     * Remove the scope from the given Eloquent query builder.
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @return void
     */
    public function remove(BuilderBase $builder)
    {
        $column = $builder->getModel()->getLeftColumnName();
        $query = $builder->getQuery();

        foreach ((array) $query->orders as $key => $order) {

            if (!$this->isNestedTreeConstraint($order, $column))
                continue;

            unset($query->orders[$key]);
            $query->orders = array_values($query->orders);
        }
    }

    /**
     * Determine if the given order clause is a nested tree constraint.
     * @param  array   $order
     * @param  string  $column
     * @return bool
     */
    protected function isNestedTreeConstraint(array $order, $column)
    {
        return $order['column'] == $column;
    }

}
