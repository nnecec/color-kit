'use client'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  Pagination,
  Spinner,
  Switch,
  Tab,
  Tabs,
  Tooltip,
} from '@nextui-org/react'
import { MoonFilledIcon, SunFilledIcon } from '@nextui-org/shared-icons'

export const FloatingComponents = () => {
  return (
    <div className="relative z-20 w-1/2 flex-col lg:flex">
      <div className="flex flex-wrap">
        <Switch endContent={<MoonFilledIcon />} size="lg" startContent={<SunFilledIcon />} />

        <Input
          className="w-[200px]"
          color="secondary"
          defaultValue="NextUI"
          label="Input"
          labelPlacement="outside"
          onClear={() => {}}
          variant="bordered"
        />

        <Card className="h-[120px] max-w-fit" isFooterBlurred>
          <Image
            alt="Professional camera"
            className="h-[100%] -translate-y-12 object-cover"
            height={120}
            src="https://nextui.org/_next/image?url=%2Fimages%2Fcard-example-6.webp&w=256&q=75"
            width={120}
          />
          <CardFooter className="border-1 bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-xl border-white/20 py-2 shadow-lg before:rounded-xl before:bg-black/10">
            <p className="text-xs font-semibold text-white/80">Camera</p>
            <p className="text-xs font-semibold text-white/80">$525</p>
          </CardFooter>
        </Card>

        <Button color="primary">Hello</Button>

        <Tabs
          aria-label="Floating tabs example"
          className=""
          classNames={{
            base: '',
            tabList: 'max-w-[200px] shadow-sm',
          }}
          radius="full"
          size="sm"
        >
          <Tab key="notes" title="Notes" />
          <Tab key="tasks" title="Tasks" />
          <Tab key="files" title="Files" />
        </Tabs>

        <Card className="max-w-fit border-none" shadow="lg">
          <CardBody>
            <h1 className="text-primary">tailwind-plugin-palette</h1>
            <h1 className="text-secondary">Build a color palette</h1>
          </CardBody>
        </Card>

        <div>
          <Pagination
            classNames={{
              base: 'rounded-xl',
            }}
            color="primary"
            initialPage={2}
            showControls
            showShadow
            total={10}
          />
        </div>

        <Tooltip
          color="secondary"
          content="Developers love Next.js"
          placement="top"
          showArrow
          style={{
            zIndex: 39,
          }}
        >
          <Button className="max-w-fit" color="secondary" size="sm" variant="flat">
            Tooltip
          </Button>
        </Tooltip>

        <Card className="max-w-fit border-none" shadow="lg">
          <CardBody>
            <Spinner color="secondary" size="lg" />
          </CardBody>
        </Card>

        <Card className="max-w-fit" isFooterBlurred>
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={200}
            src="/images/hero-card.webp"
            width={200}
          />
          <CardFooter className="rounded-large border-1 shadow-small bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden border-white/20 py-1 before:rounded-xl before:bg-white/10">
            <p className="text-tiny text-white/80">Available soon.</p>
            <Button className="text-tiny bg-black/20 text-white" color="default" radius="lg" size="sm" variant="flat">
              Notify me
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
