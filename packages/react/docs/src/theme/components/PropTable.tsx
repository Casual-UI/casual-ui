import React, { useEffect, useState } from 'react'
import { CTable } from 'casual-ui-react'
import {
  CustomRender,
  CTableColumn,
} from '@site/ui/src/components/table/CTable'
import { PropItem } from 'react-docgen-typescript'

interface PropTableProps {
  name: string
  typeWidth?: string
}

export const PropTable = ({ name, typeWidth = '120px' }: PropTableProps) => {
  const typeRender: CustomRender = ({ val }) => {
    return (
      <code>
        {new Map([
          ['CTheme', `'primary' | 'secondary' | 'warning' | 'negative'`],
          ['CSlot', 'JSX.Element | string'],
          ['CSize', `'sm' | 'md' | 'lg'`],
        ]).get(val.name) || val.name}
      </code>
    )
  }

  const columns: CTableColumn<PropItem>[] = [
    { title: '名称', field: 'name', width: '120px' },
    {
      title: '描述',
      field: 'description',
      customRender: ({ val }) => (
        <div dangerouslySetInnerHTML={{ __html: val }}></div>
      ),
    },
    {
      title: '类型',
      field: 'type',
      customRender: typeRender,
      width: typeWidth,
    },
    {
      title: '必填',
      field: 'required',
      customRender: ({ val }) => (val ? '是' : '否'),
      width: '50px',
    },
    {
      title: '默认值',
      field: 'defaultValue',
      width: '100px',
      customRender: ({ val }) => {
        return val === null ? (
          '-'
        ) : (
          <code>
            {new Map<boolean | string, string>([
              [true, 'true'],
              [false, 'false'],
              ['', "''"],
            ]).get(val.value) || val.value}
          </code>
        )
      },
    },
  ]

  const [data, setData] = useState([])

  useEffect(() => {
    if (name) {
      import(`@site/.docusaurus/o-components-doc/default/${name}.json`).then(
        r => {
          setData(Object.values(r.default[0].props))
        }
      )
    }
  }, [])

  return <CTable<PropItem> data={data} columns={columns} rowKey="name" />
}
